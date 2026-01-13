import { div } from "../../scripts/dom-helpers.js";

(function decorate() {
  const allBlocks = document.querySelectorAll('.table-with-icons');

  allBlocks.forEach((block) => {
    block.querySelectorAll(':scope > ul, .default-content-wrapper > ul').forEach((outerUl) => {
      const outerLis = [...outerUl.querySelectorAll(':scope > li')];
      if (!outerLis.length) return;

      const rows = outerLis
        .map((outerLi) => outerLi.querySelector(':scope > ul'))
        .filter(Boolean)
        .map((innerUl) => [...innerUl.querySelectorAll(':scope > li')]);

      if (!rows.length) return;

      const [headerRow, ...bodyRows] = rows;

      const columnCount = Math.max(
        ...rows.map((r) => r.length),
      );

      const gridEl = div({
        class: 'pipe-grid',
        style: `--cols: ${columnCount}`,
      });

      if (headerRow?.length) {
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
  });
}());
