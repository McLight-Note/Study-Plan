// Courses page: your video links in order, with a status and the time you stopped at.

import { state, saveMain } from "./store.js";
import { esc, newId, toast, watchUrl, thumbnailUrl, parseYouTube } from "./ui.js";

const STATUS = [
  ["todo", "Not started"],
  ["watching", "Watching"],
  ["done", "Done"],
];

export function renderCourses(page) {
  function courseHtml(course, index) {
    const thumb = thumbnailUrl(course);
    const details = [course.channel, course.length].filter(Boolean).join(", ");
    const openLabel =
      course.status === "watching" && course.stoppedAt ? "Continue at " + course.stoppedAt : "Open on YouTube";
    const statusButtons = STATUS.map(
      ([value, label]) =>
        `<button data-action="status" data-value="${value}" aria-pressed="${course.status === value}">${label}</button>`
    ).join("");

    return `
      <li class="course is-${course.status}" data-id="${esc(course.id)}">
        <span class="course-step" aria-hidden="true">${index + 1}</span>
        <a class="course-thumb" href="${esc(watchUrl(course))}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
          ${thumb ? `<img src="${esc(thumb)}" alt="" loading="lazy" width="320" height="180">` : ""}
        </a>
        <div class="course-body">
          <h2>${esc(course.label)}</h2>
          ${course.title ? `<p class="course-title">${esc(course.title)}</p>` : ""}
          ${details ? `<p class="quiet">${esc(details)}</p>` : ""}
          <div class="course-actions">
            <a class="btn btn-primary" href="${esc(watchUrl(course))}" target="_blank" rel="noopener">${esc(openLabel)}</a>
            <div class="segmented" role="group" aria-label="Status of ${esc(course.label)}">${statusButtons}</div>
          </div>
          <label class="field field-inline">
            <span>Stopped at</span>
            <input data-field="stoppedAt" value="${esc(course.stoppedAt)}" placeholder="1:02:30" inputmode="numeric" autocomplete="off">
          </label>
          <details class="more">
            <summary>Notes and edit</summary>
            <label class="field"><span>Notes</span>
              <textarea data-field="notes" rows="3">${esc(course.notes)}</textarea></label>
            <label class="field"><span>Name</span>
              <input data-field="label" value="${esc(course.label)}"></label>
            <label class="field"><span>Video title</span>
              <input data-field="title" value="${esc(course.title)}"></label>
            <label class="field"><span>Link</span>
              <input data-field="url" type="url" value="${esc(course.url)}"></label>
            <div class="row">
              <button class="btn btn-quiet" data-action="up" ${index === 0 ? "disabled" : ""}>Move up</button>
              <button class="btn btn-quiet" data-action="down" ${index === state.courses.length - 1 ? "disabled" : ""}>Move down</button>
              <button class="btn btn-danger" data-action="remove">Remove</button>
            </div>
          </details>
        </div>
      </li>`;
  }

  function draw() {
    const done = state.courses.filter((c) => c.status === "done").length;
    page.innerHTML = `
      <header class="page-head">
        <h1>Courses <span lang="ko">강의</span></h1>
        <p class="lead">${done} of ${state.courses.length} finished. Type where you stopped and the button takes you straight back there.</p>
      </header>
      <ol class="courses">${state.courses.map(courseHtml).join("")}</ol>
      <form class="add" id="add-course">
        <h2>Add a link</h2>
        <div class="add-fields">
          <label class="field"><span>Name</span><input name="label" required placeholder="TypeScript"></label>
          <label class="field"><span>Link</span><input name="url" type="url" required placeholder="https://www.youtube.com/watch?v=…"></label>
          <button class="btn btn-primary">Add to the list</button>
        </div>
      </form>`;
  }

  const find = (el) => state.courses.find((c) => c.id === el.closest(".course")?.dataset.id);

  page.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const course = find(button);
    if (!course) return;
    const index = state.courses.indexOf(course);
    const action = button.dataset.action;

    if (action === "status") course.status = button.dataset.value;
    if (action === "remove") {
      state.courses.splice(index, 1);
      toast("Removed " + course.label);
    }
    if (action === "up" && index > 0) {
      [state.courses[index - 1], state.courses[index]] = [state.courses[index], state.courses[index - 1]];
    }
    if (action === "down" && index < state.courses.length - 1) {
      [state.courses[index + 1], state.courses[index]] = [state.courses[index], state.courses[index + 1]];
    }
    saveMain();
    draw();
  });

  // Text fields save when you leave them.
  page.addEventListener("change", (event) => {
    const field = event.target.dataset.field;
    const course = find(event.target);
    if (!field || !course) return;
    course[field] = event.target.value.trim();
    if (field === "stoppedAt" && course.stoppedAt && course.status === "todo") course.status = "watching";
    saveMain();
    if (field === "notes") return; // nothing else on the page shows the notes

    // Redraw just this course so the buttons pick up the new time, name or link.
    const item = event.target.closest(".course");
    const wasOpen = item.querySelector("details").open;
    const holder = document.createElement("ol");
    holder.innerHTML = courseHtml(course, state.courses.indexOf(course));
    const fresh = holder.firstElementChild;
    fresh.querySelector("details").open = wasOpen;
    item.replaceWith(fresh);
  });

  // If a thumbnail cannot load (offline, or not a YouTube link), drop the broken image.
  page.addEventListener("error", (event) => {
    if (event.target.matches(".course-thumb img")) event.target.remove();
  }, true);

  page.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const url = form.get("url").trim();
    state.courses.push({
      id: "c-" + newId(),
      label: form.get("label").trim(),
      title: "",
      channel: "",
      length: parseYouTube(url)?.list ? "playlist" : "",
      url,
      status: "todo",
      stoppedAt: "",
      notes: "",
    });
    saveMain();
    draw();
    toast("Added to the list");
  });

  draw();
}
