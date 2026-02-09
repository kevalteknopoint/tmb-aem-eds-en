export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  // Get alert color from block's data attribute (set by AEM author)
  const alertColor = block.getAttribute('data-alert-color') || 'info';

  [...block.children].forEach((row) => {
    // Skip if not enough children
    if (row.children.length < 2) return;

    const title = row.children[0];
    const description = row.children[1];

    // Create alert container
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${alertColor}`;

    
    // Apply color class ONLY to the alert div, not the section
    alertDiv.setAttribute('data-color', alertColor);

    // Create title element
    const titleEl = document.createElement("h4");
    titleEl.className = "alert-title";
    titleEl.append(...title.childNodes);

    // Create description element
    const descEl = document.createElement("p");
    descEl.className = "alert-description";
    descEl.append(...description.childNodes);

    // Append to alert
    alertDiv.append(titleEl, descEl);

    // Replace row with alert
    row.replaceWith(alertDiv);
  });
}
