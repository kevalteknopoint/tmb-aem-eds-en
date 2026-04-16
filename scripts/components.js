import { loadCSS } from "./aem.js";

function blockExists(selector, scope = document) {
  if (scope === document) {
    return !!document.querySelector(selector);
  }

  return !!scope.querySelector(selector) || (scope.matches && scope.matches(selector));
}

export default function loadNonBlockLibs(scope = document, isFragment = false) {
  const blocks = [
    {
      selector: '.rate-details',
      name: 'rate-details',
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
      noJs: true
    },
    {
      selector: '.legal-tc-guide',
      name: 'legal-tc-guide',
    },
    {
      selector: '.online-banking-legal',
      name: 'online-banking-legal',
      noJs: true
    },
    {
      selector: '.faq-legal',
      name: 'faq-legal',
      noJs: true
    },
    {
      selector: '.faq-legal-table',
      name: 'faq-legal-table',
      noJs: true
    },
    {
      selector: '.legal-privacy',
      name: 'legal-privacy',
      noJs: true
    },
    {
      selector: '.search-results-page',
      name: 'search-page',
    },
    {
      selector: '.system-table',
      name: 'system-table',
    },
    {
      selector: '.mortgage-insurance',
      name: 'mortgage-insurance',
    },
    {
      selector: '.lenders-mortgage-insurance',
      name: 'lenders-mortgage-insurance',
    },
    {
      selector: '.evergreen-left-menu',
      name: 'evergreen-left-menu',
    },
    {
      selector: '.form-banner',
      name: 'form-banner',
      noJs: true
    },
    {
      selector: '.aboutus-grid-content',
      name: 'aboutus-grid-content'
    }
  ];

  const cacheBuster = isFragment ? `?v=${Date.now()}` : '';

  blocks.forEach(({ selector, name, noCss, noJs }) => {
    if (blockExists(selector, scope)) {
      if (!noJs) {
        import(`../blocks/${name}/${name}.js${cacheBuster}`).catch((err) => console.error(`Failed to load ${name}`, err));
      }
      if (!noCss) loadCSS(`${window.hlx.codeBasePath}/blocks/${name}/${name}.css`);
    }
  });
}
