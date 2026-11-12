// Workouts page: log a session, look back at history, edit routines, see progress.
//
// A routine is a template:  { id, name, exercises: [{ name, group, sets }] }
// A session is one workout: { id, routineId, routineName, date, day, note,
//                             exercises: [{ name, group, sets: [{ kg, reps, rest }] }] }
// While you are logging, the half-finished session is kept in state.draft
// (all values as text, exactly as typed) so a page reload does not lose it.

import { state, saveMain, saveDraft, saveSession, deleteSession, sortedSessions } from "./store.js";
import { esc, newId, today, formatDate, toast } from "./ui.js";
import { nextRoutine } from "./home.js";

let tab = "log";
let chartExercise = "";
let confirmDelete = ""; // id of the session or routine waiting for a second click

// ---- helpers -----------------------------------------------------------------

// The sets from the last time you did this exercise (same routine if possible).
function lastSets(name, routineId, skipId) {
  const sessions = sortedSessions().filter((s) => s.id !== skipId);
  const has = (s) => s.exercises.find((e) => e.name === name);
  const session = sessions.find((s) => s.routineId === routineId && has(s)) || sessions.find(has);
  return session ? has(session).sets : [];
}

function setText(set) {
  const main = set.kg !== null && set.kg !== "" ? `${set.kg} kg × ${set.reps}` : `${set.reps}`;
  return esc(main) + (set.rest ? ` <span class="rest">rest ${esc(set.rest)}</span>` : "");
}

function startDraft(routine) {
  state.draft = {
    id: newId(),
    isEdit: false,
    routineId: routine.id,
    routineName: routine.name,
    date: today(),
    day: Math.max(0, ...state.sessions.map((s) => s.day || 0)) + 1,
    note: "",
    exercises: routine.exercises.map((exercise) => {
      const last = lastSets(exercise.name, routine.id);
      return {
        name: exercise.name,
        group: exercise.group,
        // Start from last time's weight and rest; reps stay empty for you to fill in.
        sets: Array.from({ length: Math.max(1, exercise.sets) }, (_, i) => ({
          kg: String(last[i]?.kg ?? last.at(-1)?.kg ?? ""),
          reps: "",
          rest: String(last[i]?.rest ?? ""),
        })),
      };
    }),
  };
  saveDraft();
}

function editSession(session) {
  state.draft = {
    ...structuredClone(session),
    isEdit: true,
    exercises: session.exercises.map((e) => ({
      name: e.name,
      group: e.group,
      sets: e.sets.map((s) => ({ kg: String(s.kg ?? ""), reps: String(s.reps ?? ""), rest: String(s.rest ?? "") })),
    })),
  };
  saveDraft();
}

// Turn the typed text into a clean session. Empty sets and exercises are dropped.
function draftToSession(draft) {
  const number = (text) => {
    const n = parseFloat(String(text).replace(",", "."));
    return Number.isFinite(n) ? n : null;
  };
  return {
    id: draft.id,
    routineId: draft.routineId,
    routineName: draft.routineName,
    date: draft.date || today(),
    day: draft.day || null,
    note: (draft.note || "").trim(),
    exercises: draft.exercises
      .map((e) => ({
        name: e.name.trim(),
        group: e.group || "",
        sets: e.sets
          .filter((s) => s.reps.trim() !== "")
          .map((s) => ({ kg: number(s.kg), reps: s.reps.trim(), rest: number(s.rest) })),
      }))
      .filter((e) => e.name && e.sets.length),
  };
}

// ---- Log tab -------------------------------------------------------------------

function pickRoutineHtml() {
  if (!state.routines.length) {
    return `<p class="empty">No routines yet. Add one on the Routines tab, then come back to log it.</p>`;
  }
  const next = nextRoutine();
  const rows = state.routines
    .map((routine) => {
      const last = sortedSessions().find((s) => s.routineId === routine.id);
      return `
        <button class="pick ${routine === next ? "is-next" : ""}" data-action="start" data-id="${esc(routine.id)}">
          <span class="pick-name">${esc(routine.name)}</span>
          <span class="quiet">${routine === next ? "Next in your rotation. " : ""}${
        last ? "Last done " + formatDate(last.date) : "Not logged yet"
      }</span>
        </button>`;
    })
    .join("");
  return `<h2>Which workout are you doing?</h2><div class="picks">${rows}</div>`;
}

function editorHtml() {
  const draft = state.draft;
  const exercises = draft.exercises
    .map((exercise, ei) => {
      const last = lastSets(exercise.name, draft.routineId, draft.id);
      const sets = exercise.sets
        .map(
          (set, si) => `
          <div class="set" data-ex="${ei}" data-set="${si}">
            <span class="set-n">${si + 1}</span>
            <input data-field="kg" value="${esc(set.kg)}" inputmode="decimal" autocomplete="off" aria-label="Set ${si + 1} weight in kg">
            <input data-field="reps" value="${esc(set.reps)}" placeholder="${esc(last[si]?.reps ?? "")}" autocomplete="off" aria-label="Set ${si + 1} reps">
            <input data-field="rest" value="${esc(set.rest)}" inputmode="decimal" autocomplete="off" aria-label="Set ${si + 1} rest in minutes">
            <button class="icon-btn" data-action="remove-set" aria-label="Remove set ${si + 1}">×</button>
          </div>`
        )
        .join("");
      return `
        <section class="exercise" data-ex="${ei}">
          <div class="exercise-head">
            <div>
              <h3>${esc(exercise.name)}</h3>
              <p class="quiet">${esc(exercise.group)}${
        last.length ? (exercise.group ? ". " : "") + "Last time: " + last.map(setText).join(", ") : ""
      }</p>
            </div>
            <button class="btn btn-quiet" data-action="remove-exercise">Remove</button>
          </div>
          <div class="set set-labels" aria-hidden="true"><span>Set</span><span>kg</span><span>Reps</span><span>Rest (min)</span><span></span></div>
          ${sets}
          <button class="btn btn-quiet" data-action="add-set">Add set</button>
        </section>`;
    })
    .join("");

  return `
    <div class="editor">
      <div class="editor-head">
        <h2>${esc(draft.routineName)}${draft.day ? `, day ${draft.day}` : ""}</h2>
        <label class="field field-inline"><span>Date</span>
          <input type="date" data-draft="date" value="${esc(draft.date)}"></label>
      </div>
      ${exercises}
      <form class="add-exercise" data-form="add-exercise">
        <label class="field"><span>Add an exercise to this workout</span>
          <input name="name" required placeholder="Pull-ups" autocomplete="off"></label>
        <button class="btn">Add exercise</button>
      </form>
      <label class="field"><span>Note</span>
        <textarea data-draft="note" rows="2" placeholder="How it felt, what to change next time">${esc(draft.note)}</textarea></label>
      <div class="row editor-actions">
        <button class="btn btn-primary" data-action="save-workout">${draft.isEdit ? "Save changes" : "Save workout"}</button>
        <button class="btn btn-quiet" data-action="discard">${draft.isEdit ? "Cancel" : "Discard"}</button>
      </div>
    </div>`;
}

// ---- History tab ---------------------------------------------------------------

function historyHtml() {
  const sessions = sortedSessions();
  if (!sessions.length) return `<p class="empty">Nothing logged yet. Your first saved workout shows up here.</p>`;
  return (
    `<p class="quiet">${sessions.length} workouts logged. Open one to see the sets, edit it or delete it.</p>` +
    sessions
      .map((s) => {
        const setCount = s.exercises.reduce((n, e) => n + e.sets.length, 0);
        const lines = s.exercises
          .map((e) => `<li><strong>${esc(e.name)}</strong><span>${e.sets.map(setText).join(", ")}</span></li>`)
          .join("");
        return `
          <details class="session" data-id="${esc(s.id)}">
            <summary>
              <span class="session-date">${formatDate(s.date)}</span>
              <span class="session-name">${esc(s.routineName)}</span>
              <span class="quiet">${s.day ? `Day ${s.day}, ` : ""}${setCount} sets</span>
            </summary>
            <ul class="session-sets">${lines}</ul>
            ${s.note ? `<p class="session-note">${esc(s.note)}</p>` : ""}
            <div class="row">
              <button class="btn" data-action="edit-session">Edit</button>
              <button class="btn btn-danger" data-action="delete-session">${
                confirmDelete === s.id ? "Tap again to delete" : "Delete"
              }</button>
            </div>
          </details>`;
      })
      .join("")
  );
}

// ---- Routines tab --------------------------------------------------------------

function routinesHtml() {
  const routines = state.routines
    .map((routine, ri) => {
      const rows = routine.exercises
        .map(
          (e, ei) => `
          <div class="rx" data-e="${ei}">
            <input data-field="name" value="${esc(e.name)}" aria-label="Exercise name">
            <input data-field="group" value="${esc(e.group)}" aria-label="Muscle group" placeholder="Group">
            <input data-field="sets" type="number" min="1" max="12" value="${esc(e.sets)}" aria-label="Number of sets">
            <span class="rx-unit" aria-hidden="true">sets</span>
            <button class="icon-btn" data-action="rx-up" aria-label="Move ${esc(e.name)} up" ${ei === 0 ? "disabled" : ""}>↑</button>
            <button class="icon-btn" data-action="rx-down" aria-label="Move ${esc(e.name)} down" ${
            ei === routine.exercises.length - 1 ? "disabled" : ""
          }>↓</button>
            <button class="icon-btn" data-action="rx-remove" aria-label="Remove ${esc(e.name)}">×</button>
          </div>`
        )
        .join("");
      return `
        <section class="routine" data-r="${ri}">
          <label class="field"><span>Routine name</span>
            <input class="routine-name" data-field="routine-name" value="${esc(routine.name)}"></label>
          <div class="rx rx-labels" aria-hidden="true"><span>Exercise</span><span>Group</span><span>Sets</span><span></span><span></span><span></span></div>
          ${rows || `<p class="quiet">No exercises yet.</p>`}
          <div class="row">
            <button class="btn" data-action="rx-add">Add exercise</button>
            <button class="btn btn-danger" data-action="routine-remove">${
              confirmDelete === routine.id ? "Tap again to delete" : "Delete routine"
            }</button>
          </div>
        </section>`;
    })
    .join("");
  return `
    <p class="quiet">Changes save as you make them. The order here is the order of your rotation. Editing a routine does not change workouts you already logged.</p>
    ${routines}
    <button class="btn btn-primary" data-action="routine-add">Add a routine</button>`;
}

// ---- Progress tab --------------------------------------------------------------

function progressHtml() {
  // Every exercise you have logged, most often first.
  const counts = new Map();
  state.sessions.forEach((s) => s.exercises.forEach((e) => counts.set(e.name, (counts.get(e.name) || 0) + 1)));
  const names = [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a));
  if (!names.length) return `<p class="empty">Log a workout and your progress shows up here.</p>`;
  if (!names.includes(chartExercise)) chartExercise = names[0];

  // Heaviest set of each session, oldest first.
  const points = sortedSessions()
    .reverse()
    .map((s) => {
      const exercise = s.exercises.find((e) => e.name === chartExercise);
      const weights = exercise ? exercise.sets.map((x) => x.kg).filter((kg) => typeof kg === "number") : [];
      return weights.length ? { date: s.date, kg: Math.max(...weights), sets: exercise.sets } : null;
    })
    .filter(Boolean);

  const options = names.map((n) => `<option ${n === chartExercise ? "selected" : ""}>${esc(n)}</option>`).join("");
  const recent = points
    .slice(-8)
    .reverse()
    .map((p) => `<tr><td>${formatDate(p.date)}</td><td>${p.sets.map(setText).join(", ")}</td></tr>`)
    .join("");

  return `
    <label class="field field-inline"><span>Exercise</span>
      <select id="chart-exercise">${options}</select></label>
    ${chartHtml(points)}
    ${recent ? `<table class="recent"><thead><tr><th>Date</th><th>Sets</th></tr></thead><tbody>${recent}</tbody></table>` : ""}`;
}

function chartHtml(points) {
  if (points.length < 2) return `<p class="empty">Two sessions with a weight are needed to draw a line.</p>`;
  const W = 640, H = 240, left = 44, right = 16, top = 16, bottom = 30;
  const kgs = points.map((p) => p.kg);
  const min = Math.min(...kgs), max = Math.max(...kgs);
  const span = max - min || 1;
  const x = (i) => left + (i / (points.length - 1)) * (W - left - right);
  const y = (kg) => top + (1 - (kg - min) / span) * (H - top - bottom);
  const line = points.map((p, i) => `${x(i).toFixed(1)},${y(p.kg).toFixed(1)}`).join(" ");
  const dots = points
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.kg).toFixed(1)}" r="4"><title>${formatDate(p.date)}: ${p.kg} kg</title></circle>`)
    .join("");
  const lastPoint = points.at(-1);
  return `
    <figure class="chart">
      <figcaption>Heaviest set per session, in kg. From ${points[0].kg} kg to ${lastPoint.kg} kg over ${points.length} sessions.</figcaption>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart of the heaviest set per session">
        <line class="axis" x1="${left}" y1="${y(min)}" x2="${W - right}" y2="${y(min)}"/>
        <line class="axis" x1="${left}" y1="${y(max)}" x2="${W - right}" y2="${y(max)}"/>
        <text x="${left - 8}" y="${y(min) + 4}" text-anchor="end">${min}</text>
        <text x="${left - 8}" y="${y(max) + 4}" text-anchor="end">${max}</text>
        <text x="${left}" y="${H - 8}">${formatDate(points[0].date)}</text>
        <text x="${W - right}" y="${H - 8}" text-anchor="end">${formatDate(lastPoint.date)}</text>
        <polyline points="${line}"/>
        ${dots}
      </svg>
    </figure>`;
}

// ---- the page ------------------------------------------------------------------

export function renderWorkouts(page) {
  function draw() {
    const tabs = [
      ["log", "Log"],
      ["history", "History"],
      ["routines", "Routines"],
      ["progress", "Progress"],
    ]
      .map(([id, label]) => `<button role="tab" data-tab="${id}" aria-selected="${tab === id}">${label}</button>`)
      .join("");

    let body = "";
    if (tab === "log") body = state.draft ? editorHtml() : pickRoutineHtml();
    if (tab === "history") body = historyHtml();
    if (tab === "routines") body = routinesHtml();
    if (tab === "progress") body = progressHtml();

    page.innerHTML = `
      <header class="page-head">
        <h1>Workouts <span lang="ko">운동</span></h1>
        <div class="tabs" role="tablist">${tabs}</div>
      </header>
      <div class="tab-body">${body}</div>`;
  }

  let draftTimer;
  const saveDraftSoon = () => {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 300);
  };

  page.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-tab]");
    if (tabButton) {
      tab = tabButton.dataset.tab;
      confirmDelete = "";
      draw();
      return;
    }
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const draft = state.draft;

    // -- Log tab --
    if (action === "start") {
      startDraft(state.routines.find((r) => r.id === button.dataset.id));
    }
    if (action === "add-set" || action === "remove-set" || action === "remove-exercise") {
      const ei = Number(button.closest("[data-ex]").dataset.ex);
      const exercise = draft.exercises[ei];
      if (action === "add-set") {
        const previous = exercise.sets.at(-1);
        exercise.sets.push({ kg: previous?.kg ?? "", reps: "", rest: previous?.rest ?? "" });
      }
      if (action === "remove-set") exercise.sets.splice(Number(button.closest(".set").dataset.set), 1);
      if (action === "remove-exercise") draft.exercises.splice(ei, 1);
      saveDraft();
    }
    if (action === "save-workout") {
      const session = draftToSession(draft);
      if (!session.exercises.length) {
        toast("Fill in the reps for at least one set before saving.", true);
        return;
      }
      saveSession(session);
      state.draft = null;
      saveDraft();
      tab = "history";
      toast(draft.isEdit ? "Changes saved" : "Workout saved");
    }
    if (action === "discard") {
      state.draft = null;
      saveDraft();
      if (draft.isEdit) tab = "history";
    }

    // -- History tab --
    if (action === "edit-session" || action === "delete-session") {
      const id = button.closest(".session").dataset.id;
      if (action === "edit-session") {
        if (state.draft) {
          toast("Save or discard the workout you are logging first.", true);
          return;
        }
        editSession(state.sessions.find((s) => s.id === id));
        tab = "log";
      } else if (confirmDelete === id) {
        deleteSession(id);
        confirmDelete = "";
        toast("Workout deleted");
      } else {
        confirmDelete = id;
        draw();
        page.querySelector(`.session[data-id="${CSS.escape(id)}"]`).open = true;
        return;
      }
    }

    // -- Routines tab --
    if (action === "routine-add") {
      state.routines.push({ id: "r-" + newId(), name: "New routine", exercises: [] });
      saveMain();
    }
    if (action.startsWith("rx-") || action === "routine-remove") {
      const routine = state.routines[Number(button.closest(".routine").dataset.r)];
      const ei = Number(button.closest(".rx")?.dataset.e);
      const list = routine.exercises;
      if (action === "rx-add") list.push({ name: "New exercise", group: "", sets: 3 });
      if (action === "rx-remove") list.splice(ei, 1);
      if (action === "rx-up") [list[ei - 1], list[ei]] = [list[ei], list[ei - 1]];
      if (action === "rx-down") [list[ei + 1], list[ei]] = [list[ei], list[ei + 1]];
      if (action === "routine-remove") {
        if (confirmDelete !== routine.id) {
          confirmDelete = routine.id;
          draw();
          return;
        }
        state.routines = state.routines.filter((r) => r !== routine);
        confirmDelete = "";
        toast("Routine deleted");
      }
      saveMain();
    }
    draw();
  });

  // Typing in the workout editor updates the draft without redrawing the page.
  page.addEventListener("input", (event) => {
    const el = event.target;
    if (!state.draft) return;
    const setRow = el.closest(".set");
    if (setRow && el.dataset.field) {
      state.draft.exercises[setRow.dataset.ex].sets[setRow.dataset.set][el.dataset.field] = el.value;
      saveDraftSoon();
    } else if (el.dataset.draft) {
      state.draft[el.dataset.draft] = el.value;
      saveDraftSoon();
    }
  });

  page.addEventListener("change", (event) => {
    const el = event.target;
    if (el.id === "chart-exercise") {
      chartExercise = el.value;
      draw();
      return;
    }
    // Routine fields save when you leave them.
    const routineBox = el.closest(".routine");
    if (!routineBox || !el.dataset.field) return;
    const routine = state.routines[Number(routineBox.dataset.r)];
    if (el.dataset.field === "routine-name") {
      routine.name = el.value.trim() || "Untitled routine";
    } else {
      const exercise = routine.exercises[Number(el.closest(".rx").dataset.e)];
      if (el.dataset.field === "sets") exercise.sets = Math.min(12, Math.max(1, parseInt(el.value, 10) || 1));
      else exercise[el.dataset.field] = el.value.trim();
    }
    saveMain();
  });

  page.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.dataset.form !== "add-exercise" || !state.draft) return;
    const name = new FormData(event.target).get("name").trim();
    if (!name) return;
    state.draft.exercises.push({ name, group: "", sets: [{ kg: "", reps: "", rest: "" }] });
    saveDraft();
    draw();
  });

  draw();
}
