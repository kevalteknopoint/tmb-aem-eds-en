import {
  div, h3, h4, h5, p, a,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const newBlock = div({ class: 'compare-accounts-cards' });
  [...block.children].forEach((row) => {
    const cells = Array.from(row.children);

    const [
      activeCardEl,
      titleEl,
      descriptionEl,
      interestPretitleEl,
      interestRateEl,
      disclaimerEl,
      buttonTextEl,
      buttonTitleEl,
      buttonLinkEl,
      buttonTargetEl,
      buttonStyleEl,
    ] = cells;
  
    const isActive = activeCardEl?.textContent.trim() === 'true';
  
    const card = div(
      {
        class: [
          'compare-accounts-card',
          isActive && 'active',
        ].filter(Boolean),
      },
  
      /* Product title */
      h3(
        { class: 'product-title' },
        titleEl?.textContent.trim(),
      ),
  
      /* Product description */
      h4(
        { class: 'product-description' },
        descriptionEl?.textContent.trim(),
      ),
  
      /* Interest pretitle */
      h5(
        { class: 'product-interest-pretitle' },
        interestPretitleEl?.textContent.trim(),
      ),
  
      /* Interest rate (keep authored markup) */
      p(
        { class: 'product-interest-rate' },
        interestRateEl?.querySelector('*'),
      ),
  
      /* Disclaimer */
      p(
        { class: 'product-disclaimer' },
        disclaimerEl?.textContent.trim(),
      ),
  
      /* CTA */
      p(
        { class: 'button-container' },
        a(
          {
            href: buttonLinkEl?.textContent.trim() || '#',
            title: buttonTitleEl?.textContent.trim(),
            target: buttonTargetEl?.textContent.trim() || '_self',
            class: [
              'button',
              buttonStyleEl?.textContent.trim(),
            ].filter(Boolean),
          },
          buttonTextEl?.textContent.trim(),
        ),
      ),
    );

    newBlock.appendChild(card);
  });

  block.replaceChildren(newBlock);
}
