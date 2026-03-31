

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
    let cardLink = sections[5];
    let renderCardLink = false;

    // remove empty sections
    if (isEmpty(externalIcon)) externalIcon = null;
    if (isEmpty(mainContent)) mainContent = null;
    if (isEmpty(providedBy)) providedBy = null;
    if (isEmpty(logo)) logo = null;
    if (isEmpty(description)) description = null;
    if (isEmpty(cardLink)) cardLink = null;

    const cardHref = cardLink?.querySelector('a')?.href;

    if (cardHref && !mainContent?.querySelector('a') && !description?.querySelector('a')) {
      renderCardLink = true;
    }

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

    if (renderCardLink) {
      const cardLinkEle = document.createElement('a');
      cardLinkEle?.classList.add('is-clickable');
      cardLinkEle.href = cardHref;
      card.appendChild(cardLinkEle);
    }

    if (externalIcon) {
      externalIcon.classList.add('card-external-icon');
      card.append(externalIcon);
    }

    card.append(body);
  });
}
