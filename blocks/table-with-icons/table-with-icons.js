import { div } from "../../scripts/dom-helpers.js";

function splitNodesByPipe(nodes) {
  const cells = [[]];
  let current = 0;

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split('|');

      parts.forEach((part, index) => {
        if (part.trim()) {
          cells[current].push(document.createTextNode(part.trim()));
        }
        if (index < parts.length - 1) {
          current += 1;
          cells[current] = [];
        }
      });
    } else {
      cells[current].push(node.cloneNode(true));
    }
  });

  return cells;
}

(function decorate() {
  const allBlocks = document.querySelectorAll('.table-with-icons');

  allBlocks.forEach((block) => {
    block.querySelectorAll('ul').forEach((ulEl) => {
      const liEls = [...ulEl.querySelectorAll(':scope > li')];
      if (liEls.length < 2) return;

      let headerCells = null;
      let startIndex = 0;

      const headerLi = liEls[0];
      const headerEl = headerLi.querySelector('h1, h2, h3, h4, h5, h6');

      if (headerEl) {
        const headerParts = headerEl.textContent.split('|').map((c) => c.trim());
        if (headerParts.length > 1) {
          headerCells = headerParts;
          startIndex = 1;
        }
      }

      const bodyRows = liEls.slice(startIndex).map((li) =>
        splitNodesByPipe([...li.childNodes]),
      ).filter((row) => row.length > 1);

      if (!bodyRows.length) return;

      const columnCount = Math.max(
        headerCells?.length || 0,
        ...bodyRows.map((r) => r.length),
      );

      const gridEl = div({
        class: 'pipe-grid',
        style: `--cols: ${columnCount}`,
      });

      if (headerCells) {
        const headerRow = div({ class: 'pipe-grid-row pipe-grid-header' });

        headerCells.forEach((cell) => {
          headerRow.append(div({ class: 'pipe-grid-cell' }, cell));
        });

        gridEl.append(headerRow);
      }

      bodyRows.forEach((row) => {
        const rowEl = div({ class: 'pipe-grid-row' });

        row.forEach((cellNodes) => {
          const cellEl = div({ class: 'pipe-grid-cell' });
          cellNodes.forEach((n) => cellEl.append(n));
          rowEl.append(cellEl);
        });

        gridEl.append(rowEl);
      });

      ulEl.replaceWith(gridEl);
    });
  });
}());
