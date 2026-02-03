import { div } from "../../scripts/dom-helpers.js";

export default function decorateWhoCanApply(block) {
  const column = block.querySelector("div");
  column.classList.add("column-container");

  const applyContainer = block.closest('.who-can-apply-section');

  const newWrapper = div({ class: 'who-can-apply-section-wrapper' });

  [...applyContainer.children].forEach((child) => {
    newWrapper.appendChild(child);
  });

  applyContainer.appendChild(newWrapper);
}
