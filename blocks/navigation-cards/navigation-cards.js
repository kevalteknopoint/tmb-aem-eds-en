export default async function decorate(block) {
  const cards = [...block.children];

  cards.forEach((card) => {
    card.classList.add('nav-card');

    const sections = [...card.children];

    const externalIcon = sections[0];
    const mainContent = sections[1];
    const providedBy = sections[2];
    const logo = sections[3];
    const description = sections[4];

    const body = document.createElement('div');
    body.className = 'nav-card-body';

    if (mainContent) body.append(mainContent);
    if (providedBy) body.append(providedBy);
    if (logo) body.append(logo);
    if (description) body.append(description);

    card.innerHTML = '';

    if (externalIcon) card.append(externalIcon);
    card.append(body);

    const link = description?.querySelector('a');

    if (link) {
      card.classList.add('is-clickable');

      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          window.location.href = link.href;
        }
      });
    }
  });
}
