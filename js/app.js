// Starts the site: loads saved data, shows the right page, draws the account box.

import { sync, load, subscribe, connectCloud, signIn, signOut } from "./store.js";
import { esc } from "./ui.js";
import { renderHome } from "./home.js";
import { renderCourses } from "./courses.js";
import { renderWorkouts } from "./workouts.js";
import { renderKorean } from "./korean.js";
import { renderFiles } from "./files.js";

const pages = {
  "": renderHome,
  courses: renderCourses,
  workouts: renderWorkouts,
  korean: renderKorean,
  files: renderFiles,
};

function currentRoute() {
  const name = location.hash.replace(/^#\/?/, "").split("/")[0];
  return name in pages ? name : "";
}

// Draw the page that matches the address, like #/courses.
function showPage() {
  const name = currentRoute();
  const view = document.getElementById("view");
  const page = document.createElement("div");
  page.className = "page page-" + (name || "home");
  view.replaceChildren(page);
  pages[name](page);

  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.dataset.route === name) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function drawAccount() {
  const box = document.getElementById("account");
  const words = {
    local: "Saved on this device only.",
    connecting: "Connecting to your cloud data…",
    signedOut: "Saved on this device. Sign in to keep it in the cloud too.",
    saving: "Saving…",
    synced: "Saved to the cloud.",
    error: sync.error,
  };
  let html = `<p class="account-status is-${sync.status}">${esc(words[sync.status])}</p>`;
  if (!sync.configured) {
    html += `<a class="link" href="#/files">Set up cloud saving</a>`;
  } else if (sync.user) {
    html += `<p class="account-user">${esc(sync.user.email || sync.user.name || "Signed in")}</p>
             <button class="btn btn-quiet" data-action="sign-out">Sign out</button>`;
  } else if (sync.status !== "connecting") {
    html += `<button class="btn" data-action="sign-in">Sign in with Google</button>`;
  }
  box.innerHTML = html;
}

document.getElementById("account").addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "sign-in") signIn();
  if (action === "sign-out") signOut();
});

load();
drawAccount();
showPage();

window.addEventListener("hashchange", () => {
  showPage();
  window.scrollTo(0, 0);
});

subscribe((what) => {
  drawAccount();
  if (what === "data") showPage(); // cloud data arrived, or you signed in or out
});

connectCloud();
