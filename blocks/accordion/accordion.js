import { injectIcon } from "../../scripts/aem.js";

export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  const shouldBeOpen = block.classList.contains("accordion-open");
  const singleExpansion = block.classList.contains("single-expansion");

  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement("summary");
    summary.className = "accordion-item-label";
    summary.append(...label.childNodes);
    injectIcon('chevron-up-round', summary);

    const body = row.children[1];
    body.className = "accordion-item-body";

    const details = document.createElement("details");
    details.className = "accordion-item";

    // Set open state based on accordion-open class
    details.open = shouldBeOpen;

    details.append(summary, body);
    row.replaceWith(details);
  });

  if (singleExpansion) {
    block.querySelectorAll('.accordion-item').forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          document.querySelectorAll('.accordion-item').forEach((other) => {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  }
}
