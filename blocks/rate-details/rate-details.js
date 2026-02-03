import { applyCapsizeToElement } from '../../libs/capsize/capsize.min.js';
import { div } from '../../scripts/dom-helpers.js';

function createGrid(block) {
  block.querySelectorAll(':scope > ul, .default-content-wrapper > ul').forEach((outerUl) => {
    const outerLis = [...outerUl.querySelectorAll(':scope > li')];
    if (!outerLis.length) return;

    const rows = outerLis
      .map((outerLi) => outerLi.querySelector(':scope > ul'))
      .filter(Boolean)
      .map((innerUl) => [...innerUl.querySelectorAll(':scope > li')]);

    if (rows.length < 2) return;

    const firstRow = rows[0];

    const isHeaderRow = firstRow.some((cellLi) =>
      cellLi.querySelector('h1, h2, h3, h4, h5, h6')
    );

    const headerRow = isHeaderRow ? firstRow : null;
    const bodyRows = isHeaderRow ? rows.slice(1) : rows;

    const columnCount = Math.max(
      ...rows.map((r) => r.length),
    );

    const gridEl = div({
      class: 'pipe-grid',
      style: `--cols: ${columnCount}`,
    });

    // Header row (only if detected)
    if (headerRow) {
      const headerEl = div({
        class: 'pipe-grid-row pipe-grid-header',
      });

      headerRow.forEach((cellLi) => {
        const cell = div({ class: 'pipe-grid-cell' });
        [...cellLi.childNodes].forEach((n) => cell.append(n.cloneNode(true)));
        headerEl.append(cell);
      });

      gridEl.append(headerEl);
    }

    // Body rows
    bodyRows.forEach((row) => {
      const rowEl = div({ class: 'pipe-grid-row' });

      row.forEach((cellLi) => {
        const cell = div({ class: 'pipe-grid-cell' });
        [...cellLi.childNodes].forEach((n) => cell.append(n.cloneNode(true)));
        rowEl.append(cell);
      });

      gridEl.append(rowEl);
    });

    outerUl.replaceWith(gridEl);
  });
}

(function decorateRateDetails() {
  if (window.location.origin.includes('author')) return;

  const allRateDetailSections = document.querySelectorAll('.rate-details');

  allRateDetailSections.forEach((section) => {
    const contentWrappers = section.querySelectorAll('.default-content-wrapper');
    contentWrappers.forEach((wrapper) => {
      createGrid(wrapper);
    });

    setTimeout(() => {
      const capsizeItems = section.querySelectorAll('.rate-num, .rate-percent, .rate-pa');
      capsizeItems.forEach(applyCapsizeToElement);
    }, 1000);
  });
}());
