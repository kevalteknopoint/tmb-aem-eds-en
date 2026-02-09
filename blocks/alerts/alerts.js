export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  const alertType = block.className.match(/info|success|warning|error/)?.[0] || "info";

  [...block.children].forEach((row) => {
    const title = row.children[0];
    const description = row.children[1];

    // Create alert container
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${alertType}`;

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
