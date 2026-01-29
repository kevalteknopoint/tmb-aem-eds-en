export default function decorateOnlineBanking(block) {
  const cardsUl = block.querySelector(".cards ul");
  if (!cardsUl) return;

  cardsUl.classList.add("banking-cards-ul");

  block.querySelectorAll(".banking-cards-ul > li").forEach((li, idx) => {
    li.classList.add(`banking-li-${idx + 1}`);

    const bodies = Array.from(li.querySelectorAll('.cards-card-body'));
    if (bodies.length === 0) return;

    const mainBody = bodies[0];

    // Consolidate fragmented bodies
    bodies.slice(1).forEach((extraBody) => {
      while (extraBody.firstChild) {
        mainBody.appendChild(extraBody.firstChild);
      }
      extraBody.remove();
    });

    if (idx > 0) {
      const heading = mainBody.querySelector('h1, h2, h3, h4, h5, h6');
      const description = mainBody.querySelector('p:not(.button-container)');

      // Setup card-bottom-1
      const topContainer = document.createElement('div');
      topContainer.className = 'card-bottom-1';

      if (heading) {
        const h2 = document.createElement('h2');
        h2.className = 'banking-desc-1';
        h2.textContent = heading.textContent.trim();
        topContainer.appendChild(h2);
      }

      if (description) {
        const pDesc = document.createElement('p');
        // pDesc.className = 'banking-desc-2';
        pDesc.textContent = description.textContent.trim();
        topContainer.appendChild(pDesc);
      }

      // Setup card-bottom-2 for icons and buttons
      const bottomContainer = document.createElement('div');
      bottomContainer.className = 'card-bottom-2';
      const pButtons = document.createElement('p');
      // pButtons.className = 'banking-desc-3';

      // FIX: Find ALL links instead of just the first one
      const allLinks = Array.from(mainBody.querySelectorAll('a'));

      allLinks.forEach((link) => {
        // If it's a badge/icon link, keep it as is; otherwise apply button classes
        if (!link.querySelector('.icon')) {
          link.className = 'button primary';
        }
        pButtons.appendChild(link);
      });

      // 3. Final Re-assembly
      mainBody.innerHTML = '';

      if (topContainer.hasChildNodes()) {
        mainBody.appendChild(topContainer);
      }

      if (pButtons.hasChildNodes()) {
        bottomContainer.appendChild(pButtons);
        mainBody.appendChild(bottomContainer);
      }
    }

    li.querySelectorAll('div:empty').forEach((empty) => empty.remove());
  });
}
