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

function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function loadPlaceholders() {
  if (window.placeholders?.default && Object.keys(window.placeholders?.default)?.length) {
    Object.keys(window.placeholders.default).forEach((key) => {
      let value = window.placeholders.default[key];
      const isInterestRate = /(\d+(?:\.\d+)?)(%)(p\.a\.)/g.test(value);
      if (isInterestRate) {
        value = value.replaceAll(/(\d+(?:\.\d+)?)(%)(p\.a\.)/g, `<span class="rate-num">$1</span><span class="rate-unit"><span class="rate-percent">$2</span><span class="rate-pa">$3</span></span>`);
      }
      document.body.innerHTML = document.body.innerHTML.replaceAll(`~${key}~`, `<span class="${camelToKebab(key)}${isInterestRate ? ' interest-rate' : ''}">${value}</span>`);
    });
  }
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
  loadPlaceholders();

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

window.initAos = function initAos() {
  window.AOS?.init();
};

loadPage();
