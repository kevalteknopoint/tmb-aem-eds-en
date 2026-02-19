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
  const rows = [...block.children];

  rows.forEach((row, idx) => {
    row.classList.add(`insurance-row-${idx}`);
    const innerDiv = row.querySelector('div');
    if (innerDiv) {
      innerDiv.classList.add(`insurance-content-${idx}`);
    }
    if (idx === 1) {
      const dateElement = row.querySelector('p');
      if (dateElement) {
        const rawDate = dateElement.textContent.trim();
        const dateObj = new Date(rawDate);
        if (!Number.isNaN(dateObj)) {
          const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }).format(dateObj);
          dateElement.textContent = formattedDate;
        }
      }
    }
    console.log(`Decorated row ${idx}`, row);
  });
}());
