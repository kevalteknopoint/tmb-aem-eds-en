import {
  div, h3, h4, h5, p, a, span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  if (window.location.href.includes('author')) return;

  const section = block.closest('.section.compare-accounts');
  if (!section) return;

  const wrapFragments = () => {
    const wrappers = [...section.querySelectorAll('.fragment-wrapper')];
    
    if (wrappers.length > 0 && !section.querySelector('.fragment-parent')) {
      const fragmentParent = div({ class: 'fragment-parent' });
      
      wrappers[0].parentNode.insertBefore(fragmentParent, wrappers[0]);
      
      wrappers.forEach((wrapper) => fragmentParent.appendChild(wrapper));
      
      console.log('Fragments successfully wrapped!');
      return true; 
    }
    return false;
  };

  if (!wrapFragments()) {
    const observer = new MutationObserver((mutations, obs) => {
      const success = wrapFragments();
      if (success) {
        obs.disconnect(); 
      }
    });

    observer.observe(section, {
      childList: true,
      subtree: true,
    });
  }

  const cardsContainer = div({ class: 'compare-accounts-cards' });

  [...block.children].forEach((row) => {
    const cells = Array.from(row.children);
    const [
      activeCardEl, titleEl, descriptionEl, interestPretitleEl, 
      interestRateEl, disclaimerEl, buttonTextEl, buttonTitleEl, 
      buttonLinkEl, buttonTargetEl, buttonStyleEl,
    ] = cells;

    const isActive = activeCardEl?.textContent.trim() === 'true';

    // Interest rate logic
    const rawRate = interestRateEl?.textContent.trim() || '';
    let rateContent;
    if (rawRate.includes('%')) {
      const num = rawRate.replace('%', '').trim();
      rateContent = span({ class: 'interest-rate' },
        span({ class: 'rate-num' }, num),
        span({ class: 'rate-unit' }, 
          span({ class: 'rate-percent' }, '%'),
          span({ class: 'rate-pa' }, 'p.a.')
        )
      );
    } else {
      rateContent = interestRateEl?.querySelector('*') || rawRate;
    }

    const card = div(
      { class: ['compare-accounts-card', isActive && 'active'].filter(Boolean) },
      h3({ class: 'product-title' }, titleEl?.textContent.trim()),
      h4({ class: 'product-description' }, descriptionEl?.textContent.trim()),
      h5({ class: 'product-interest-pretitle' }, interestPretitleEl?.textContent.trim()),
      p({ class: 'product-interest-rate' }, p(rateContent)),
      p({ class: 'product-disclaimer' }, disclaimerEl?.textContent.trim()),
      p({ class: 'button-container' },
        a({
          href: buttonLinkEl?.textContent.trim() || '#',
          title: buttonTitleEl?.textContent.trim(),
          target: buttonTargetEl?.textContent.trim() || '_self',
          class: ['button', buttonStyleEl?.textContent.trim()].filter(Boolean),
        }, buttonTextEl?.textContent.trim())
      ),
    );
    cardsContainer.appendChild(card);
  });

  const wrapper = div({ class: 'compare-accounts-wrapper' }, cardsContainer);
  block.replaceChildren(wrapper);
}