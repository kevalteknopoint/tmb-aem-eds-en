export default function decorate(block) {
  if (window.location.href.includes('author')) return;

  // Alert content is already in rows, just wrap each one properly
  [...block.children].forEach((row) => {
    if (row.children.length < 1) return;

    // Get content from cells
    const titleCell = row.children[0];
    const descCell = row.children[1] || null;
    const buttonTextCell = row.children[2] || null;
    const buttonUrlCell = row.children[3] || null;

    // Wrap title in h4
    const titleEl = document.createElement('h4');
    titleEl.append(...titleCell.childNodes);

    // Wrap description in p (if exists)
    const descEl = document.createElement('p');
    if (descCell) {
      descEl.append(...descCell.childNodes);
    }

    // Create button if button text and URL exist
    let buttonEl = null;
    if (buttonTextCell && buttonUrlCell) {
      const buttonText = buttonTextCell.textContent?.trim();
      const buttonUrl = buttonUrlCell.textContent?.trim();
      
      if (buttonText && buttonUrl) {
        buttonEl = document.createElement('a');
        buttonEl.href = buttonUrl;
        buttonEl.textContent = buttonText;
        buttonEl.className = 'alert-button';
      }
    }

    // Clear the row and add wrapped elements
    row.innerHTML = '';
    row.append(titleEl);
    if (descCell) {
      row.append(descEl);
    }
    if (buttonEl) {
      row.append(buttonEl);
    }
  });
}
