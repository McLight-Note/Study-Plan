// Home page: which week of the plan you are in, and the next thing in each track.

import { PLAN_START, PLAN_WEEKS } from "./config.js";
import { state, sortedSessions } from "./store.js";
import { esc, formatDate, watchUrl } from "./ui.js";
import { nextUnit } from "./korean.js";

// Week 1 starts on PLAN_START. Returns 0 before the plan begins.
function currentWeek() {
  const start = new Date(PLAN_START + "T00:00:00");
  const days = Math.floor((Date.now() - start.getTime()) / 86_400_000);
  return days < 0 ? 0 : Math.floor(days / 7) + 1;
}

// The routine that comes after the one you did last.
export function nextRoutine() {
  if (!state.routines.length) return null;
  const last = sortedSessions()[0];
  const index = last ? state.routines.findIndex((r) => r.id === last.routineId) : -1;
  return state.routines[(index + 1) % state.routines.length];
}

export function renderHome(page) {
  const week = currentWeek();
  const start = new Date(PLAN_START + "T00:00:00");

  let heading;
  let sub;
  if (week === 0) {
    heading = "Starts " + start.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    sub = `${PLAN_WEEKS} weeks of Korean, training and code. One square per week.`;
  } else if (week > PLAN_WEEKS) {
    heading = "All " + PLAN_WEEKS + " weeks done";
    sub = "Change PLAN_START in js/config.js to begin a new plan.";
  } else {
    const monday = new Date(start.getTime() + (week - 1) * 7 * 86_400_000);
    const sunday = new Date(monday.getTime() + 6 * 86_400_000);
    const short = { day: "numeric", month: "short" };
    heading = `Week ${week} of ${PLAN_WEEKS}`;
    sub = `${monday.toLocaleDateString("en-GB", short)} to ${sunday.toLocaleDateString("en-GB", short)}`;
  }

  const cells = Array.from({ length: PLAN_WEEKS }, (_, i) => {
    const n = i + 1;
    const cls = n < week ? "is-done" : n === week ? "is-now" : "";
    return `<li class="cell ${cls}" ${n === week ? 'aria-current="true"' : ""}>${n}</li>`;
  }).join("");

  // Next course: the one you are watching, otherwise the first not started.
  const course =
    state.courses.find((c) => c.status === "watching") || state.courses.find((c) => c.status === "todo");
  const courseRow = course
    ? `<div class="next-what">
         <strong>${esc(course.label)}</strong>
         <span>${course.stoppedAt ? "Stopped at " + esc(course.stoppedAt) : esc(course.title || "Not started yet")}</span>
       </div>
       <a class="btn btn-primary" href="${esc(watchUrl(course))}" target="_blank" rel="noopener">
         ${course.status === "watching" ? "Continue on YouTube" : "Start on YouTube"}</a>`
    : `<div class="next-what"><strong>Every course is done</strong><span>Add a new link on the Courses page.</span></div>
       <a class="btn" href="#/courses">Open courses</a>`;

  // Next workout.
  const routine = nextRoutine();
  const last = sortedSessions()[0];
  const workoutRow = state.draft
    ? `<div class="next-what"><strong>${esc(state.draft.routineName)}</strong><span>You have a workout in progress.</span></div>
       <a class="btn btn-primary" href="#/workouts">Finish logging</a>`
    : routine
    ? `<div class="next-what">
         <strong>${esc(routine.name)}</strong>
         <span>${last ? "Last session: " + esc(last.routineName) + ", " + formatDate(last.date) : "No sessions logged yet"}</span>
       </div>
       <a class="btn btn-primary" href="#/workouts">Log workout</a>`
    : `<div class="next-what"><strong>No routines yet</strong><span>Add one on the Workouts page.</span></div>
       <a class="btn" href="#/workouts">Open workouts</a>`;

  // Next Korean unit.
  const unit = nextUnit();
  const koreanRow = unit
    ? `<div class="next-what"><strong lang="ko">서울대 한국어 ${unit.book}, ${unit.unit}과</strong><span>Next unit to finish</span></div>
       <a class="btn" href="#/korean">Open Korean</a>`
    : `<div class="next-what"><strong>4B finished</strong><span>Time for mock exams.</span></div>
       <a class="btn" href="#/korean">Open Korean</a>`;

  page.innerHTML = `
    <header class="hero">
      <h1>${esc(heading)}</h1>
      <p class="lead">${esc(sub)}</p>
      <ol class="cells weeks" aria-label="Weeks of the plan">${cells}</ol>
    </header>

    <section class="next" aria-labelledby="next-title">
      <h2 id="next-title">Next up</h2>
      <div class="next-row"><span class="next-track">Courses</span>${courseRow}</div>
      <div class="next-row"><span class="next-track">Workouts</span>${workoutRow}</div>
      <div class="next-row"><span class="next-track">Korean</span>${koreanRow}</div>
    </section>`;
}
