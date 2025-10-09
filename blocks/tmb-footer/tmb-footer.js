
export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  const shouldBeOpen = block.classList.contains("accordion-open");

  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement("summary");
    summary.className = "accordion-item-label";
    summary.append(...label.childNodes);

    const body = row.children[1];
    body.className = "footer-accordion-item-body";

    const details = document.createElement("details");
    details.className = "footer-accordion-item";

    // Set open state based on accordion-open class
    details.open = shouldBeOpen;

    details.append(summary, body);
    row.replaceWith(details);
  });
}
