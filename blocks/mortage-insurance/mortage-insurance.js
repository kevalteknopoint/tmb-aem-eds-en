(function decorateMortgageInsurance() {
  // 1. Guard clause for author mode
  if (window.location.href.includes("author")) return;

  // 2. Target the block specifically
  const block = document.querySelector('.mortage-insurance.block');
  if (!block) {
    console.warn('Mortgage Insurance block not found');
    return;
  }

  console.log('Decorating mortgage-insurance block', block);

  // 3. Get the direct children (the rows)
  // We use Array.from or spread because querySelectorAll returns a NodeList
  const rows = [...block.children];

  rows.forEach((row, idx) => {
    // Add a unique class to each "row" container
    row.classList.add(`insurance-row-${idx}`);
    // Optional: Add a class to the inner div for more specific styling
    const innerDiv = row.querySelector('div');
    if (innerDiv) {
      innerDiv.classList.add(`insurance-content-${idx}`);
    }
    console.log(`Decorated row ${idx}`, row);
  });
}());
