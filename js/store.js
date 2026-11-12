// All the data the site remembers, and how it is saved.
//
// - Everything is always saved in this browser (localStorage), so the site
//   works with no account and no internet.
// - When Firebase is set up and you are signed in, the same data is also saved
//   to Firestore, so your phone and laptop show the same thing.

import { firebaseConfig } from "./config.js";
import { seedRoutines, seedSessions } from "./seed.js";
import { seedCourses } from "./seed-courses.js";

const STORAGE_KEY = "studyhub:v1";

// The data every page reads from.
export const state = {
  courses: [],
  routines: [],
  sessions: [],
  korean: { done: {}, notes: "" },
  draft: null, // the workout you are in the middle of logging
};

// Bookkeeping about what still has to be sent to the cloud.
const meta = { dirtyMain: false, pending: [], deleted: [] };

// What the account box shows.
export const sync = {
  configured: Boolean(firebaseConfig.apiKey),
  user: null,
  status: "local", // local | connecting | signedOut | saving | synced | error
  error: "",
};

let cloud = null;
const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
}
function notify(what) {
  listeners.forEach((fn) => fn(what));
}
function setStatus(status, error = "") {
  sync.status = status;
  sync.error = error;
  notify("sync");
}

// ---- Saving in this browser ------------------------------------------------

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, meta }));
  } catch (err) {
    console.warn("Could not save in this browser", err);
  }
}

export function load() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    saved = null;
  }
  if (saved && Array.isArray(saved.routines)) {
    state.courses = saved.courses || [];
    state.routines = saved.routines;
    state.sessions = saved.sessions || [];
    state.korean = { done: {}, notes: "", ...(saved.korean || {}) };
    state.draft = saved.draft || null;
    Object.assign(meta, saved.meta || {});
  } else {
    // First visit: start from the imported spreadsheet and the course list.
    state.courses = structuredClone(seedCourses);
    state.routines = structuredClone(seedRoutines);
    state.sessions = structuredClone(seedSessions);
    persist();
  }
}

// ---- Changing data -----------------------------------------------------------

// Call after changing courses, routines or the Korean checklist.
export function saveMain() {
  meta.dirtyMain = true;
  persist();
  schedulePush();
}

// The half-finished workout only lives in this browser.
export function saveDraft() {
  persist();
}

export function saveSession(session) {
  const index = state.sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) state.sessions[index] = session;
  else state.sessions.push(session);
  if (!meta.pending.includes(session.id)) meta.pending.push(session.id);
  persist();
  schedulePush();
}

export function deleteSession(id) {
  state.sessions = state.sessions.filter((s) => s.id !== id);
  meta.pending = meta.pending.filter((x) => x !== id);
  if (!meta.deleted.includes(id)) meta.deleted.push(id);
  persist();
  schedulePush();
}

// Newest first.
export function sortedSessions() {
  return [...state.sessions].sort(
    (a, b) => (b.date || "").localeCompare(a.date || "") || (b.day || 0) - (a.day || 0)
  );
}

// ---- Saving to Firebase ------------------------------------------------------

function mainPart() {
  return {
    courses: state.courses,
    routines: state.routines,
    korean: state.korean,
    updatedAt: new Date().toISOString(),
  };
}

let pushTimer = null;
function schedulePush() {
  if (!cloud || !sync.user) return;
  setStatus("saving");
  clearTimeout(pushTimer);
  pushTimer = setTimeout(push, 800);
}

// Send everything that changed since the last successful save.
async function push() {
  if (!cloud || !sync.user) return false;
  try {
    if (meta.dirtyMain) {
      meta.dirtyMain = false;
      try {
        await cloud.setMain(mainPart());
      } catch (err) {
        meta.dirtyMain = true;
        throw err;
      }
    }
    const ids = [...meta.pending];
    const toSend = state.sessions.filter((s) => ids.includes(s.id));
    if (toSend.length) await cloud.setSessions(toSend);
    meta.pending = meta.pending.filter((id) => !ids.includes(id));

    for (const id of [...meta.deleted]) {
      await cloud.deleteSession(id);
      meta.deleted = meta.deleted.filter((x) => x !== id);
    }
    persist();
    setStatus("synced");
    return true;
  } catch (err) {
    console.error(err);
    persist();
    setStatus("error", "Could not save to the cloud. Your changes are kept on this device.");
    return false;
  }
}

async function onUser(user) {
  sync.user = user;
  if (!user) {
    setStatus("signedOut");
    notify("data");
    return;
  }
  setStatus("connecting");
  try {
    const main = await cloud.getMain();
    if (!main) {
      // First sign-in ever: copy what is on this device up to the cloud.
      meta.dirtyMain = true;
      meta.pending = state.sessions.map((s) => s.id);
      await push();
    } else {
      // Send anything logged while signed out or offline, then read the cloud copy.
      const sent = await push();
      if (sent) {
        const fresh = await cloud.getMain();
        state.courses = fresh.courses || [];
        state.routines = fresh.routines || [];
        state.korean = { done: {}, notes: "", ...(fresh.korean || {}) };
        state.sessions = await cloud.getSessions();
        persist();
        setStatus("synced");
      }
    }
  } catch (err) {
    console.error(err);
    setStatus("error", "Could not read your cloud data. Check the Firestore rules in README.md.");
  }
  notify("data");
}

// Called once when the page opens.
export async function connectCloud() {
  if (!sync.configured) return;
  setStatus("connecting");
  try {
    const { startCloud } = await import("./cloud.js");
    cloud = await startCloud(onUser);
  } catch (err) {
    console.error(err);
    setStatus("error", "Could not reach Firebase. Working from this device for now.");
  }
}

export async function signIn() {
  if (!cloud) return;
  try {
    await cloud.signIn();
  } catch (err) {
    console.error(err);
    const message =
      err.code === "auth/unauthorized-domain"
        ? "Firebase does not know this address yet. Add it under Authentication > Settings > Authorized domains."
        : err.code === "auth/popup-closed-by-user"
        ? ""
        : "Sign-in failed: " + (err.code || err.message);
    if (message) setStatus("error", message);
  }
}

export async function signOut() {
  if (cloud) await cloud.signOut();
}

// The Files page talks to Firebase directly through this.
export function getCloud() {
  return cloud && sync.user ? cloud : null;
}
