import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  //

  const teaserContent = document.querySelector(".tmb-footer .default-content-wrapper");
  teaserContent.classList.add("tmb-footer-wrapper");

  const subteaserContent = document.querySelector(".tmb-sub-footer .default-content-wrapper");
  subteaserContent.classList.add("tmb-sub-footer-wrapper");

  const content = document.querySelectorAll('.tmb-footer .default-content-wrapper p');
  content.forEach((e, index) => {
    e.classList.add(`para-${index + 1}`);
  });

  const subcontent = document.querySelectorAll('.tmb-footer .tmb-footer-wrapper.default-content-wrapper p');
  subcontent.forEach((e, index) => {
    e.classList.add(`para-${index + 1}`);
  });

  const ul = document.querySelectorAll('.tmb-footer .tmb-footer-wrapper ul');
  ul.forEach((e, index) => {
    e.classList.add(`ul-${index + 1}`);
  });

  const subul = document.querySelectorAll('.tmb-sub-footer .tmb-sub-footer-wrapper ul');
  subul.forEach((e, index) => {
    e.classList.add(`ul-${index + 1}`);
  });

  const iconBtns = document.querySelectorAll(
    '.section.tmb-footer .tmb-footer-wrapper .para-1 .icon.icon-tmb-btn:not(.a11y-processed), '
    + '.section.tmb-footer .tmb-footer-wrapper .para-1 .icon.icon-jump_to_top:not(.a11y-processed)'
  );

  iconBtns.forEach((iconBtn) => {
    // ACCESSIBILITY
    iconBtn.setAttribute('role', 'button');
    iconBtn.setAttribute('tabindex', '0');
    iconBtn.setAttribute('aria-label', 'Scroll to top of page');

    // Add a flag class to mark this element as processed.
    iconBtn.classList.add('a11y-processed');
    iconBtn.addEventListener('keydown', function iconBtnClick(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.click();
      }
    });

    iconBtn.addEventListener('click', () => {
      // scroll-to-top action.
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
  });
}
