import { loadCSS } from "./aem.js";

function blockExists(selector) {
  return !!document.querySelector(selector);
}

export default function loadNonBlockLibs() {
  const blocks = [
    {
      selector: '.rate-details',
      name: 'rate-details',
    },
    {
      selector: '.icon-library',
      name: 'icon-library',
    },
    {
      selector: '.interest-table-section',
      name: 'table',
    },
    {
      selector: '.momentum-saver-section',
      name: 'momentum-saver',
    },
    {
      selector: '.product-navigation',
      name: 'product-navigation',
    },
  ];

  blocks.forEach(({ selector, name }) => {
    if (blockExists(selector)) {
      import(`../blocks/${name}/${name}.js`);
      loadCSS(`${window.hlx.codeBasePath}/blocks/${name}/${name}.css`);
    }
  });
}
