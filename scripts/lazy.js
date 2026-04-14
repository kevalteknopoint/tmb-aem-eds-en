import { getMetadata, loadCSS } from "./aem.js";
import { pageIntialization, setPersona } from "./analytics/exports.js";

async function loadSprite() {
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

    import(`../blocks/${'icon-library'}/${'icon-library'}.js`);
    loadCSS(`${window.hlx.codeBasePath}/blocks/${'icon-library'}/${'icon-library'}.css`);
  } catch (error) {
    console.error('Error loading SVG:', error);
  }
}

function loadAos() {
  window.initAos = function initAos() {
    window.AOS?.init();
  };

  window.setTimeout(() => {
    const script = document.createElement('script');
    script.setAttribute('src', '/scripts/aos.min.js');
    document.body.appendChild(script);
  });
}

function getPerformanceTierFromStore() {
  const lcpValue = window.__perfMetrics?.lcp;

  if (!lcpValue || lcpValue === 0) return 'not-available';

  if (lcpValue <= 2500) return "good";
  if (lcpValue <= 4000) return "needs-improvement";
  return "poor";
}

export async function pageAnalytics() {
  setPersona();

  function bucket(time) {
    if (time < 1000) return "fast";
    if (time < 3000) return "average";
    return "slow";
  }

  function getHttpStatus() {
    const navEntry = performance.getEntriesByType("navigation")[0];
    return navEntry?.responseStatus || 200;
  }

  function getHttpStatusGroup(code) {
    if (!code) return 'unknown';
    const firstDigit = String(code).charAt(0);
    return `${firstDigit}xx`; // e.g., "2xx", "4xx"
  }

  const basePath = getMetadata('base-path');
  const pagePath = window.location.pathname.replace(basePath, '');
  const pageName = document.title;
  const pageType = getMetadata('page-type');
  const siteSection = pagePath === '/' ? 'home' : pagePath?.split('/')?.[1];
  const sitesubSection = pagePath === '/' ? 'home' : (pagePath?.split('/')?.[2] || '');
  const pageLanguage = document.documentElement.lang;
  const pageId = '';
  const pageTemplate = 'common';
  const performanceTier = getPerformanceTierFromStore();
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
  const httpStatusCode = getHttpStatus();
  const httpStatusGroup = getHttpStatusGroup();
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

  pageIntialization({ pageName, pageType, siteSection, sitesubSection, pageLanguage, pageId, pageTemplate, performanceTier, brand, webType, backtrackFlag, helpVisitFlag, implementationVersion, domInteractiveTime, domInteractiveTimeBucket, firstContentfulPaint, firstContentfulPaintBucket, httpStatusCode, httpStatusGroup, trackingVersion, implementationEnvironment, dataLayerReadyFlag, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, product, primaryProductGroup, primaryProduct, multiProductFlag, personId, loginStatus, hasEverLoggedInFlag, visitorType });
}

function loadChatbot() {
  const encoded = getMetadata('chatbot-script');

  if (!encoded) return;

  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = encoded;
  const decoded = textarea.value;

  // Extract JS inside <script>...</script>
  const match = decoded.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return;

  const scriptContent = match[1];

  // Create and execute script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = scriptContent;

  document.body.appendChild(script);
}

export default async function initLazy() {
  loadAos();
  loadSprite();
  loadChatbot();
}
