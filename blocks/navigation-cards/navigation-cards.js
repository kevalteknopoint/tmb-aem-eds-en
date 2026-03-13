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

    // header
    if (mainContent) {
      mainContent.classList.add('card-header');
      body.append(mainContent);
    }

    // wrapper for provider + logo
    const providerWrapper = document.createElement('div');
    providerWrapper.className = 'card-provider-wrapper';

    if (providedBy) {
      providedBy.classList.add('card-provider');
      providerWrapper.append(providedBy);
    }

    if (logo) {
      logo.classList.add('card-logo');
      providerWrapper.append(logo);
    }

    if (providerWrapper.children.length) {
      body.append(providerWrapper);
    }

    // description
    if (description) {
      description.classList.add('card-description');
      body.append(description);
    }

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