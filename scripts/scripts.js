import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  loadPlaceholders,
  loadDmImages,
  decorateMain,
} from './aem.js';
import { pageIntialization, setPersona } from './analytics/exports.js';
import { fetchPlaceholders } from './placeholders.js';
import loadNonBlockLibs from './components.js';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to?.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * Get specific metadata value from the document.
 * @param {string} name of the metadata tag.
 */
export function getMetadata(name) {
  const attr = name && name.includes(":") ? "property" : "name";
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)]
    .map((m) => m.content)
    .join(", ");
  return meta || "";
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/${getMetadata('theme')}/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    if (window.isErrorPage) {
    // Run the multi-site 404 logic to fetch the correct fragment
      await loadMultiSite404(main);
      await apply404Theme();
    }
    const { decorateMain } = await import('./aem.js');

    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  if (window.isErrorPage) {
    // Force the theme before showing the header/footer
    await apply404Theme();
  }

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  window.setTimeout(() => {
    const script = document.createElement('script');
    script.setAttribute('src', '/scripts/aos.min.js');
    document.body.appendChild(script);
  });
  // load anything that can be postponed to the latest here
}

function getPerformanceTier() {
  return new Promise((resolve) => {
    let lcpValue = null;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcpValue = lastEntry.startTime;
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });

    window.addEventListener("load", () => {
      setTimeout(() => {
        observer.disconnect();

        if (!lcpValue) return resolve(null);

        if (lcpValue <= 2500) resolve("good");
        else if (lcpValue <= 4000) resolve("needs-improvement");
        else resolve("poor");

        return null;
      }, 0);
    });
  });
}

async function pageAnalytics() {
  function bucket(time) {
    if (time < 1000) return "fast";
    if (time < 3000) return "average";
    return "slow";
  }

  const basePath = getMetadata('base-path');
  const pagePath = window.location.pathname.replace(basePath, '');
  const pageName = document.title;
  const pageType = getMetadata('page-type');
  const siteSection = pagePath === '/' ? 'home' : pagePath?.split('/')?.[1];
  const siteSubSection = pagePath === '/' ? 'home' : (pagePath?.split('/')?.[2] || '');
  const pageLanguage = document.documentElement.lang;
  const pageId = '';
  const pageTemplate = 'common';
  const performanceTier = await getPerformanceTier();
  const brand = getMetadata('brand');
  const webType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
  const backtrackFlag = '';
  const helpVisitFlag = '';
  const implementationVersion = '';
  const navEntry = performance.getEntriesByType("navigation")[0];
  const domInteractiveTime = navEntry.domInteractive;
  const domInteractiveTimeBucket = bucket(domInteractiveTime);
  const firstContentfulPaint = performance.getEntriesByType("paint").find((entry) => entry.name === "first-contentful-paint")?.startTime;
  const firstContentfulPaintBucket = bucket(firstContentfulPaint);
  const httpStatusCode = '';
  const httpStatusGroup = '';
  const trackingVersion = '';
  const implementationEnvironment = '';
  const dataLayerReadyFlag = '';
  const requiredFieldMissingFlag = '';
  const testUserFlag = '';
  const qaSessionFlag = '';
  const product = '';
  const primaryProductGroup = '';
  const primaryProduct = '';
  const multiProductFlag = '';
  const personId = '';
  const loginStatus = '';
  const hasEverLoggedInFlag = '';
  const visitorType = '';

  pageIntialization(pageName, pageType, siteSection, siteSubSection, pageLanguage, pageId, pageTemplate, performanceTier, brand, webType, backtrackFlag, helpVisitFlag, implementationVersion, domInteractiveTime, domInteractiveTimeBucket, firstContentfulPaint, firstContentfulPaintBucket, httpStatusCode, httpStatusGroup, trackingVersion, implementationEnvironment, dataLayerReadyFlag, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, product, primaryProductGroup, primaryProduct, multiProductFlag, personId, loginStatus, hasEverLoggedInFlag, visitorType);
}

async function loadPage() {
  window.adobeDataLayer = window.adobeDataLayer || [];
  setPersona();

  pageAnalytics();

  await fetchPlaceholders();
  await fetchPlaceholders('dev', 'dev-placeholders.json');
  loadPlaceholders();
  loadDmImages();

  await loadEager(document);
  await loadLazy(document);

  try {
    const response = await fetch(`/icons/icon-sprite.svg`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = doc.documentElement;

    document.body.appendChild(svgElement);
  } catch (error) {
    console.error('Error loading SVG:', error);
  }

  loadNonBlockLibs();
  loadDelayed();
}

/**
 * Loads the correct 404 fragment based on site-specific metadata or URL path.
 */
async function loadMultiSite404(main) {
  const { getMetadata, decorateMain } = await import('./aem.js');

  // 1. Site Detection Logic
  // Option A: Detection via URL path (e.g., /site-a/broken-link)
  const pathParts = window.location.pathname.split('/');
  const sitePrefix = pathParts[1] || 'default';

  // Option B: Detection via Metadata Spreadsheet (e.g., a '404-source' column)
  // This is better if you use custom domains for each site.
  let fragmentPath = getMetadata('404-source') || `/${sitePrefix}/au/en/404`;

  try {
    // 2. Fetch the AEM-authored fragment
    const resp = await fetch(`${fragmentPath}.plain.html`);
    
    if (resp.ok) {
      const html = await resp.text();
      main.innerHTML = html;

      // 3. Apply the Site-Specific Theme
      // This ensures 'site-a' gets Site A's CSS variables/styles
      const theme = getMetadata('theme');
      if (theme) document.body.classList.add(theme);

      // 4. Decorate the new content so blocks (columns, hero, etc.) work
      await decorateMain(main);
    } else {
      // Fallback if the specific 404 page is missing
      main.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  } catch (e) {
    console.error('Critical Error loading 404 Fragment:', e);
  }
}

async function apply404Theme() {
  const { getMetadata } = await import('./aem.js');
  
  // 1. Manually check the metadata JSON for the /404 path
  const resp = await fetch('/metadata.json');
  if (resp.ok) {
    const json = await resp.json();
    // Find metadata for /404 or based on the current site prefix
    const sitePrefix = window.location.pathname.split('/')[1];
    const meta = json.data.find((m) => m.URL === `/${sitePrefix}/**`) || json.data.find((m) => m.URL === '/404');

    if (meta && meta.Theme) {
      document.body.classList.add(meta.Theme);
    }
  }
}

window.initAos = function initAos() {
  window.AOS?.init();
};

loadPage();
