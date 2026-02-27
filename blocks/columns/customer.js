import { executeAnalytics } from './customer-analytics.js';

window.customerAnalyticsLoaded = false;

export default async function decorateCustomer(block) {
  if (!window.customerAnalyticsLoaded) executeAnalytics();
  // 1. Target the columns wrapper and add 'columns-container' class
  // This targets the div that immediately wraps the column cells
  const columnsRow = block.querySelector(".columns > div");
  if (columnsRow) {
    columnsRow.classList.add("columns-container");
  }

  // 2. Target the actual cells inside that container
  const columnCells = columnsRow ? columnsRow.querySelectorAll(":scope > div") : [];

  columnCells.forEach((col) => {
    const btnContainers = col.querySelectorAll('.button-container');

    if (btnContainers.length > 0) {
      // Pick the first container as the master
      const mainBtnContainer = btnContainers[0];

      // Merge all button containers into the first one
      btnContainers.forEach((container, i) => {
        if (i > 0) {
          while (container.firstChild) {
            mainBtnContainer.appendChild(container.firstChild);
          }
          container.remove();
        }
      });

      // Unwrap <a> from strong or em tags inside the master container
      const wrappers = mainBtnContainer.querySelectorAll('strong, em');
      wrappers.forEach((wrapper) => {
        while (wrapper.firstChild) {
          mainBtnContainer.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.remove();
      });

      // Remove any hardcoded styles
      mainBtnContainer.removeAttribute('style');
    }
  });

  // 3. Handle bottom content wrapper classes
  const customerLinkContent = block?.closest('.customer')?.querySelector(".customer .default-content-wrapper");
  console.log(customerLinkContent);
  if (customerLinkContent) {
    customerLinkContent.classList.add("content-container");
    const paragraphs = customerLinkContent.querySelectorAll("p");
    paragraphs.forEach((p, idx) => {
      p.classList.add(`para-${idx}`);
    });
  }
}
