// Korean page: tick off textbook units, keep a list of phrases to learn.

import { state, saveMain } from "./store.js";
import { esc } from "./ui.js";

// 서울대 한국어 books still ahead of you. Each has nine units.
export const BOOKS = [
  { id: "3B", units: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { id: "4A", units: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { id: "4B", units: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
];

// The first unit not ticked yet, or null when all are done.
export function nextUnit() {
  for (const book of BOOKS) {
    for (const unit of book.units) {
      if (!state.korean.done[`${book.id}-${unit}`]) return { book: book.id, unit };
    }
  }
  return null;
}

export function renderKorean(page) {
  function draw() {
    const books = BOOKS.map((book) => {
      const doneCount = book.units.filter((u) => state.korean.done[`${book.id}-${u}`]).length;
      const cells = book.units
        .map((unit) => {
          const key = `${book.id}-${unit}`;
          const done = Boolean(state.korean.done[key]);
          return `<button class="cell ${done ? "is-done" : ""}" data-unit="${key}" aria-pressed="${done}"
                    aria-label="${book.id} unit ${unit}">${unit}</button>`;
        })
        .join("");
      return `
        <section class="book">
          <h2>서울대 한국어 ${book.id}</h2>
          <p class="quiet">${doneCount} of ${book.units.length} units finished</p>
          <div class="cells">${cells}</div>
        </section>`;
    }).join("");

    page.innerHTML = `
      <header class="page-head">
        <h1>Korean <span lang="ko">한국어</span></h1>
        <p class="lead">3A is finished. Tap a unit when you complete it. The goal is a TOPIK II sitting in spring 2027.</p>
      </header>
      ${books}
      <section class="book">
        <h2>Phrases from work</h2>
        <p class="quiet">Things you heard on shift and could not have said yourself.</p>
        <textarea id="korean-notes" rows="8" lang="ko" placeholder="예: 재고 확인해 주세요">${esc(state.korean.notes)}</textarea>
      </section>`;
  }

  page.addEventListener("click", (event) => {
    const cell = event.target.closest("[data-unit]");
    if (!cell) return;
    const key = cell.dataset.unit;
    if (state.korean.done[key]) delete state.korean.done[key];
    else state.korean.done[key] = true;
    saveMain();
    draw();
    page.querySelector(`[data-unit="${key}"]`)?.focus();
  });

  page.addEventListener("change", (event) => {
    if (event.target.id === "korean-notes") {
      state.korean.notes = event.target.value;
      saveMain();
    }
  });

  draw();
}
