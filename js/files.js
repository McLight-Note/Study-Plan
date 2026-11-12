// Files page: upload notes, PDFs and screenshots to your Firebase project.

import { FILE_BACKEND } from "./config.js";
import { sync, getCloud, signIn } from "./store.js";
import { esc, formatDate, formatSize, toast } from "./ui.js";

const SETUP_STEPS = `
  <ol class="steps">
    <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener">console.firebase.google.com</a> and create a project.</li>
    <li>In <strong>Build &gt; Authentication</strong>, turn on the Google sign-in method.</li>
    <li>In <strong>Build &gt; Firestore Database</strong>, create a database and paste in the rules from <code>firestore.rules</code>.</li>
    <li>In <strong>Project settings &gt; Your apps</strong>, add a web app and copy its config into <code>js/config.js</code>.</li>
    <li>After deploying, add your Vercel address under <strong>Authentication &gt; Settings &gt; Authorized domains</strong>.</li>
  </ol>`;

export function renderFiles(page) {
  let files = null; // null while loading
  let uploading = []; // [{ name, progress }]

  function head(lead) {
    return `<header class="page-head"><h1>Files <span lang="ko">자료</span></h1><p class="lead">${lead}</p></header>`;
  }

  function draw() {
    const cloud = getCloud();

    if (!sync.configured) {
      page.innerHTML =
        head("Uploads are saved in your own Firebase project. It takes about ten minutes to connect, once.") +
        `<section class="setup"><h2>Connect Firebase</h2>${SETUP_STEPS}
           <p class="quiet">Until then, courses, workouts and Korean progress are saved in this browser only.</p></section>`;
      return;
    }
    if (!cloud) {
      page.innerHTML =
        head("Sign in to see and upload your files.") +
        (sync.status === "connecting"
          ? `<p class="empty">Connecting…</p>`
          : `<button class="btn btn-primary" data-action="sign-in">Sign in with Google</button>`);
      return;
    }

    const limit = FILE_BACKEND === "storage" ? "" : " Up to 20 MB each.";
    const progress = uploading
      .map(
        (u) => `<li class="upload"><span>${esc(u.name)}</span>
                  <progress max="1" value="${u.progress}">${Math.round(u.progress * 100)}%</progress></li>`
      )
      .join("");
    const rows =
      files === null
        ? `<p class="empty">Loading your files…</p>`
        : files.length === 0
        ? `<p class="empty">No files yet. Upload lecture notes, a TOPIK past paper or a screenshot of code you want to keep.</p>`
        : `<ul class="files">${files
            .map(
              (f) => `
              <li class="file" data-id="${esc(f.id)}">
                <div class="file-info"><strong>${esc(f.name)}</strong>
                  <span class="quiet">${formatSize(f.size)}, added ${formatDate(f.addedAt.slice(0, 10), true)}</span></div>
                <button class="btn" data-action="download">Download</button>
                <button class="btn btn-danger" data-action="delete-file">Delete</button>
              </li>`
            )
            .join("")}</ul>`;

    page.innerHTML =
      head("Kept in your Firebase project, so they open on any device you sign in on.") +
      `<label class="drop" id="drop">
         <input type="file" id="file-input" multiple>
         <strong>Choose files to upload</strong>
         <span class="quiet">or drop them here.${limit}</span>
       </label>
       ${progress ? `<ul class="uploads">${progress}</ul>` : ""}
       ${rows}`;
  }

  async function refresh() {
    const cloud = getCloud();
    if (!cloud) return;
    try {
      files = await cloud.listFiles();
    } catch (err) {
      console.error(err);
      files = [];
      toast("Could not load your files. Check the Firestore rules in README.md.", true);
    }
    draw();
  }

  async function upload(fileList) {
    const cloud = getCloud();
    if (!cloud) return;
    for (const file of fileList) {
      const item = { name: file.name, progress: 0 };
      uploading.push(item);
      draw();
      try {
        const details = await cloud.uploadFile(file, (p) => {
          item.progress = p;
          const bar = page.querySelectorAll(".upload progress")[uploading.indexOf(item)];
          if (bar) bar.value = p;
        });
        files = [details, ...(files || [])];
        toast("Uploaded " + file.name);
      } catch (err) {
        console.error(err);
        toast(err.message || "Upload failed for " + file.name, true);
      }
      uploading = uploading.filter((u) => u !== item);
      draw();
    }
  }

  page.addEventListener("change", (event) => {
    if (event.target.id === "file-input") upload([...event.target.files]);
  });

  page.addEventListener("dragover", (event) => {
    if (event.target.closest("#drop")) event.preventDefault();
  });
  page.addEventListener("drop", (event) => {
    if (!event.target.closest("#drop")) return;
    event.preventDefault();
    upload([...event.dataTransfer.files]);
  });

  page.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "sign-in") return signIn();

    const cloud = getCloud();
    const details = files?.find((f) => f.id === button.closest(".file")?.dataset.id);
    if (!cloud || !details) return;

    if (action === "download") {
      button.disabled = true;
      button.textContent = "Getting file…";
      try {
        const url = await cloud.fileUrl(details);
        const link = document.createElement("a");
        link.href = url;
        link.download = details.name;
        link.target = "_blank";
        link.rel = "noopener";
        document.body.append(link);
        link.click();
        link.remove();
      } catch (err) {
        console.error(err);
        toast("Could not download " + details.name, true);
      }
      button.disabled = false;
      button.textContent = "Download";
    }

    if (action === "delete-file") {
      if (button.dataset.sure !== "yes") {
        button.dataset.sure = "yes";
        button.textContent = "Tap again to delete";
        return;
      }
      button.disabled = true;
      try {
        await cloud.deleteFile(details);
        files = files.filter((f) => f !== details);
        toast("Deleted " + details.name);
      } catch (err) {
        console.error(err);
        toast("Could not delete " + details.name, true);
      }
      draw();
    }
  });

  draw();
  refresh();
}
