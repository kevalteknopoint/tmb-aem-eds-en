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
      selector: '.momentum-saver-section, .momentum-image-saver, .image-swapping, .momentum-app-badges, .momentum-direct-variant, .circular-image',
      name: 'momentum-saver',
    },
    {
      selector: '.product-navigation',
      name: 'product-navigation',
    },
    {
      selector: '.table-with-icons',
      name: 'table-with-icons',
    },
    {
      selector: '.page-heading',
      name: 'page-heading',
    },
    {
      selector: '.legal-tc-guide',
      name: 'legal-tc-guide',
    },
    {
      selector: '.online-banking-legal',
      name: 'online-banking-legal',
    },
    {
      selector: '.faq-legal',
      name: 'faq-legal',
    },
    {
      selector: '.faq-legal-table',
      name: 'faq-legal-table',
    },
    {
      selector: '.legal-privacy',
      name: 'legal-privacy',
    },
    {
      selector: '.system-table',
      name: 'system-table',
    },
    {
      selector: '.mortgage-insurance',
      name: 'mortgage-insurance',
    },
  ];

  blocks.forEach(({ selector, name }) => {
    if (blockExists(selector)) {
      import(`../blocks/${name}/${name}.js`);
      loadCSS(`${window.hlx.codeBasePath}/blocks/${name}/${name}.css`);
    }
  });
}
