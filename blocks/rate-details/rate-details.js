import { div } from '../../scripts/dom-helpers.js';

function createGrid(block) {
  block.querySelectorAll('ul').forEach((ulEl) => {
    const liEls = [...ulEl.querySelectorAll(':scope > li')];
    if (liEls.length < 2) return;

    let headerCells = null;
    let startIndex = 0;

    const firstLi = liEls[0];
    const headerEl = firstLi.querySelector('h1, h2, h3, h4, h5, h6');

    if (headerEl && headerEl.textContent.includes('|')) {
      headerCells = headerEl.textContent
        .split('|')
        .map((c) => c.trim());
      startIndex = 1;
    }

    const bodyRows = liEls
      .slice(startIndex)
      .map((li) => li.textContent.trim())
      .filter((text) => text.includes('|'))
      .map((text) => text.split('|').map((c) => c.trim()));

    if (bodyRows.length < 1) return;

    const columnCount = Math.max(
      headerCells ? headerCells.length : 0,
      ...bodyRows.map((r) => r.length),
    );

    if (headerCells) {
      while (headerCells.length < columnCount) headerCells.push('');
    }

    bodyRows.forEach((row) => {
      while (row.length < columnCount) row.push('');
    });

    const gridEl = div({
      class: 'pipe-grid',
      style: `--cols: ${columnCount}`,
    });

    // Header row
    if (headerCells) {
      const headerRow = div({ class: 'pipe-grid-row pipe-grid-header' },
        ...headerCells.map((cell) =>
          div({ class: 'pipe-grid-cell' }, cell || ''),
        ),
      );
      gridEl.append(headerRow);
    }

    // Body rows
    bodyRows.forEach((row) => {
      const rowEl = div({ class: 'pipe-grid-row' },
        ...row.map((cell) =>
          div({ class: 'pipe-grid-cell' }, cell || ''),
        ),
      );
      gridEl.append(rowEl);
    });

    ulEl.replaceWith(gridEl);
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
  });
}());
