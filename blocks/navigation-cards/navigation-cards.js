export default async function decorate(block) {
  const cards = [...block.children];

  const isEmpty = (el) => !el || !el.textContent.trim() && !el.querySelector('img, a, picture, span.icon');

  cards.forEach((card) => {
    card.classList.add('nav-card');

    const sections = [...card.children];

    let externalIcon = sections[0];
    let mainContent = sections[1];
    let providedBy = sections[2];
    let logo = sections[3];
    let description = sections[4];

    // remove empty sections
    if (isEmpty(externalIcon)) externalIcon = null;
    if (isEmpty(mainContent)) mainContent = null;
    if (isEmpty(providedBy)) providedBy = null;
    if (isEmpty(logo)) logo = null;
    if (isEmpty(description)) description = null;

    const body = document.createElement('div');
    body.className = 'nav-card-body';

    // header
    if (mainContent) {
      mainContent.classList.add('card-header');
      body.append(mainContent);
    }

    // provider + logo wrapper
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

    if (providerWrapper.children.length > 0) {
      body.append(providerWrapper);
    }

    // description
    if (description) {
      description.classList.add('card-description');
      body.append(description);
    }

    card.innerHTML = '';

    if (externalIcon) {
      externalIcon.classList.add('card-external-icon');
      card.append(externalIcon);
    }

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
