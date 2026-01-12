import {
  table, thead, tbody, tr, th, td,
  div,
} from '../../scripts/dom-helpers.js';

function createTable(block) {
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

    const bodyRows = liEls.slice(startIndex)
      .map((li) => li.textContent.trim())
      .filter((text) => text.includes('|'))
      .map((text) =>
        text.split('|').map((c) => c.trim())
      );

    if (bodyRows.length < 2) return;

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

    const tableEl = table({ class: 'pipe-generated-table' });

    if (headerCells) {
      tableEl.append(
        thead(
          tr(
            ...headerCells.map((cell) => th(cell || '')),
          ),
        ),
      );
    }

    tableEl.append(
      tbody(
        ...bodyRows.map((row) =>
          tr(
            ...row.map((cell) => td(cell || '')),
          ),
        ),
      ),
    );

    ulEl.replaceWith(tableEl);
  });
}

(function decorateRateDetails() {
  if (window.location.origin.includes('author')) return;

  const allRateDetailSections = document.querySelectorAll('.rate-details');

  allRateDetailSections.forEach((section) => {
    const contentWrappers = section.querySelectorAll('.default-content-wrapper');
    contentWrappers.forEach((wrapper) => {
      createTable(wrapper);

      const interestRates = wrapper.querySelectorAll('.interest-rate');
      const rateWrap = div({ class: 'interest-rates-wrapper' });
      interestRates.forEach((item, index) => {
        if (item.parentElement.classList.contains('default-content-wrapper')) {
          if (index === 0) item.insertAdjacentElement('beforebegin', rateWrap);
          rateWrap.appendChild(item);
        } else {
          if (index === 0) item.parentElement.insertAdjacentElement('beforebegin', rateWrap);
          rateWrap.appendChild(item.parentElement);
        }
      });
      wrapper.append(rateWrap);
    });
  });
}());
