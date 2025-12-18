import { div, source, video } from "../../scripts/dom-helpers.js";

const videoRegex = /\.(mp4|mov|wmv|avi|mkv|flv|webm|mpeg|mpg|m4v|3gp|3g2|ogv|ts|m2ts|mts)(\?.*)?$/i;

export default function decorate(block) {
  const rows = [...block.children];

  const desktopRow = rows[0];
  if (desktopRow) {
    const mediaCell = desktopRow.children[0];
    const altText = desktopRow.children[1]?.textContent?.trim();

    if (mediaCell?.querySelector('a') && videoRegex.test(mediaCell.querySelector('a').href)) {
      const videoBlock = video({ autoplay: '', loop: '', muted: '', playsinline: '' },
        source({ src: mediaCell.querySelector('a').href })
      );
      mediaCell.innerHTML = '';
      mediaCell.appendChild(videoBlock);
    } else if (mediaCell?.querySelector('img')) {
      mediaCell.querySelector('img').setAttribute('alt', altText || '');
    }
    desktopRow.classList.add('hero-banner-desktop-media');
    desktopRow.children[1]?.remove(); // Remove the standalone Alt text div
  }

  // --- Handle Mobile Media ---
  const mobileRow = rows[1];
  if (mobileRow) {
    const mediaCell = mobileRow.children[0];
    const altText = mobileRow.children[1]?.textContent?.trim();

    if (mediaCell?.querySelector('a') && videoRegex.test(mediaCell.querySelector('a').href)) {
      const videoBlock = video({ autoplay: '', loop: '', muted: '', playsinline: '' },
        source({ src: mediaCell.querySelector('a').href })
      );
      mediaCell.innerHTML = '';
      mediaCell.appendChild(videoBlock);
    } else if (mediaCell?.querySelector('img')) {
      mediaCell.querySelector('img').setAttribute('alt', altText || '');
    }
    mobileRow.classList.add('hero-banner-mobile-media');
    mobileRow.children[1]?.remove();
  }

  // --- Handle Content ---
  const contentRow = rows[2];
  let contentWrapper = null;
  if (contentRow) {
    contentRow.classList.add('hero-banner-content-wrap');
    const contentInner = contentRow.children[0];
    contentInner.classList.add('hero-banner-content');
    contentWrapper = contentInner; // Reference for button placement
  }

  // --- Handle Buttons ---
  const buttonRows = [rows[3], rows[4]];
  const buttonsGroup = div({ class: 'hero-banner-buttons-wrap' });

  buttonRows.forEach((btnRow) => {
    if (btnRow) {
      const cells = [...btnRow.children];
      const text = cells[0]?.textContent?.trim();
      const link = cells[1]?.querySelector('a')?.href || cells[1]?.textContent?.trim();
      const style = cells[2]?.textContent?.trim() || 'primary';
      const target = cells[3]?.textContent?.trim() || '_self';

      if (text && link) {
        const anchor = document.createElement('a');
        anchor.href = link;
        anchor.textContent = text;
        anchor.className = `button ${style}`;
        anchor.target = target;
        buttonsGroup.appendChild(anchor);
      }
      btnRow.remove(); // Remove the raw data row from the block
    }
  });

  // Append buttons group below the content inner div
  if (contentWrapper) {
    contentWrapper.appendChild(buttonsGroup);
  }
}
