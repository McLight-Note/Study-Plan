// Small helpers shared by every page.

// Escape text before putting it inside an HTML string.
export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Today's date as YYYY-MM-DD in local time.
export function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// "2026-11-12" -> "Thu 12 Nov 2026"
export function formatDate(iso, withYear = false) {
  if (!iso) return "No date";
  const d = new Date(iso + "T00:00:00");
  const options = { weekday: "short", day: "numeric", month: "short" };
  if (withYear) options.year = "numeric";
  return d.toLocaleDateString("en-GB", options);
}

export function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

// A short message at the bottom of the screen.
let toastTimer;
export function toast(message, isError = false) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.toggle("is-error", isError);
  el.classList.add("is-open");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-open"), isError ? 6000 : 2500);
}

// "1:02:30" or "12:05" or "90" -> seconds. Returns 0 when it cannot read it.
export function timeToSeconds(text) {
  const parts = String(text || "").trim().split(":").map(Number);
  if (!parts.length || parts.some((n) => Number.isNaN(n))) return 0;
  return parts.reduce((total, n) => total * 60 + n, 0);
}

// Pull the video id and playlist id out of a YouTube link.
export function parseYouTube(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    let id = "";
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (host === "youtube.com") id = u.searchParams.get("v") || "";
    if (!id && !u.searchParams.get("list")) return null;
    return { id, list: u.searchParams.get("list") || "" };
  } catch {
    return null;
  }
}

// The link that opens a course, jumping to the saved time if there is one.
export function watchUrl(course) {
  const yt = parseYouTube(course.url);
  if (!yt) return course.url;
  const params = new URLSearchParams();
  if (yt.id) params.set("v", yt.id);
  if (yt.list) params.set("list", yt.list);
  const seconds = timeToSeconds(course.stoppedAt);
  if (seconds > 0) params.set("t", seconds + "s");
  return "https://www.youtube.com/watch?" + params.toString();
}

export function thumbnailUrl(course) {
  const yt = parseYouTube(course.url);
  return yt && yt.id ? `https://i.ytimg.com/vi/${yt.id}/mqdefault.jpg` : "";
}
