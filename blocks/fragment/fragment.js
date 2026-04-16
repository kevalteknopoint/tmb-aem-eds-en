/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadDmImages,
  loadPlaceholders,
  loadSections,
} from '../../scripts/aem.js';
import loadNonBlockLibs from '../../scripts/components.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(/(\.plain)?\.html/, '');
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      const resText = await resp.text();
      main.innerHTML = resText;

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
        });
      };
      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelectorAll(':scope .section');
    if (fragmentSection && fragmentSection.length) {
      // block.classList.add(...fragmentSection.classList);
      // block.classList.remove('section');
      // block.replaceChildren(...fragmentSection.childNodes);
      block.innerHTML = '';

      fragmentSection.forEach((frag) => block.appendChild(frag));
      loadPlaceholders(block);
      loadDmImages(block);
      try {
        loadNonBlockLibs(block, true);
      } catch (e) {
        // do nothing
      }
    }
  }
}
