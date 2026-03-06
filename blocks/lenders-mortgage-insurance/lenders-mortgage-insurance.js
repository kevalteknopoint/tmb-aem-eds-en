(function decorateMortgageInsurance() {
  // 1. Guard clause for author mode
  if (window.location.href.includes("author")) return;

  const block = document.querySelector('.lenders-mortgage-insurance-check');
  if (!block) return;

  console.log('Decorating lenders-mortgage-insurance block', block);

  // 2. Select all paragraphs within the block
  const paragraphs = block.querySelectorAll("p");

  paragraphs.forEach((pTag) => {
    // Check if the paragraph contains the icon span
    const iconSpan = pTag.querySelector("span.icon");
    if (!iconSpan) return;

    // Clone the icon to move it
    const innerSpan = iconSpan.cloneNode(true);

    // Remove the icon from the original pTag before cloning the pTag
    iconSpan.remove();

    // Create the wrapper div
    // Note: Assuming 'div' is a helper function in your project (like EDS lib-franklin)
    const newDiv = document.createElement('div');
    newDiv.classList.add('content-with-icon');

    // Append the icon and the cleaned-up paragraph
    newDiv.append(innerSpan);
    newDiv.append(pTag.cloneNode(true));

    // Replace the old pTag with the new structure
    pTag.insertAdjacentElement('afterend', newDiv);
    pTag.remove();
  });
}());
