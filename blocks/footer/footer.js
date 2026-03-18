import './footer-analytics.js';
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const theme = getMetadata('theme');
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  const fragment = await loadFragment(footerPath);

  block.classList.add(theme, 'top-padding', 'bottom-padding');

  const footer = document.createElement('div');
  footer.className = 'tmb-footer';

  const getSection = (cls) =>
    fragment.querySelector(`.section.${cls}`);

  const unwrapColumns = (section) => {
    if (!section) return null;
    return section.querySelector('.columns > div');
  };

  /* =========================
     TOP BAR
  ========================== */
  const topSection = getSection('tmb-footer');
  const topContent = unwrapColumns(topSection);

  if (topContent) {
    const topBar = document.createElement('div');
    topBar.className = 'footer-top';

    const [logoCol, actionCol] = [...topContent.children];

    if (logoCol) {
      logoCol.classList.add('footer-logo');
      topBar.append(logoCol);
    }

    if (actionCol) {
      actionCol.classList.add('footer-top-actions');
      topBar.append(actionCol);
    }

    footer.append(topBar);
  }

  /* =========================
     WHITE PANEL WRAPPER
  ========================== */
  const panel = document.createElement('div');
  panel.className = 'footer-panel';

  let hasPanelContent = false;

  /* ===== LINKS ===== */
  const linksSection = getSection('tmb-footer-links');
  const linksContent = unwrapColumns(linksSection);

  if (linksContent) {
    const linksWrapper = document.createElement('div');
    linksWrapper.className = 'footer-links';

    [...linksContent.children].forEach((col) => {
      if (!col.textContent.trim()) return;
      col.classList.add('footer-col');
      linksWrapper.append(col);
    });

    if (linksWrapper.children.length) {
      panel.append(linksWrapper);
      hasPanelContent = true;
    }
  }

  /* ===== META (BSB / HELP / etc) ===== */
  const iconSection = getSection('tmb-footer-icon-links');
  const iconContent = unwrapColumns(iconSection);

  if (iconContent) {
    const metaRow = document.createElement('div');
    metaRow.className = 'footer-meta';

    [...iconContent.children].forEach((col) => {
      if (!col.textContent.trim()) return;
      col.classList.add('footer-meta-item');
      metaRow.append(col);
    });

    if (metaRow.children.length) {
      panel.append(metaRow);
      hasPanelContent = true;
    }
  }

  /* ===== CONTACT STRIP ===== */
  const contactSection = getSection('tmb-footer-contact');
  const contactContent = unwrapColumns(contactSection);

  if (contactContent) {
    const contactBar = document.createElement('div');
    contactBar.className = 'footer-contact';

    const [text, socials, cta] = [...contactContent.children];

    if (text) {
      text.classList.add('footer-contact-text');
      contactBar.append(text);
    }

    if (socials) {
      socials.classList.add('footer-social');
      contactBar.append(socials);
    }

    if (cta) {
      cta.classList.add('footer-cta');
      contactBar.append(cta);
    }

    panel.append(contactBar);
    hasPanelContent = true;
  }

  // Append panel only if something exists
  if (hasPanelContent) {
    footer.append(panel);
  }

  /* =========================
     SUB FOOTER
  ========================== */
  const subFooter = getSection('tmb-sub-footer');

  if (subFooter) {
    const subWrapper = document.createElement('div');
    subWrapper.className = 'footer-bottom';

    const legalBlocks = subFooter.querySelectorAll(
      '.default-content-wrapper'
    );

    if (legalBlocks[0]) {
      legalBlocks[0].classList.add('footer-legal');
      subWrapper.append(legalBlocks[0]);
    }

    const cols = unwrapColumns(subFooter);
    if (cols) {
      const bottomCols = document.createElement('div');
      bottomCols.className = 'footer-bottom-cols';

      [...cols.children].forEach((col, i) => {
        col.classList.add(
          i === 0 ? 'footer-acknowledgement' : 'footer-badges'
        );
        bottomCols.append(col);
      });

      subWrapper.append(bottomCols);
    }

    if (legalBlocks.length > 1) {
      const last = legalBlocks[legalBlocks.length - 1];
      last.classList.add('footer-disclaimer');
      subWrapper.append(last);
    }

    footer.append(subWrapper);
  }

  block.textContent = '';
  block.append(footer);
}
