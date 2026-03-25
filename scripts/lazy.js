import { getMetadata, loadDmImages, loadPlaceholders } from "./aem.js";
import { pageIntialization, setPersona } from "./analytics/exports.js";
import { fetchPlaceholders } from "./placeholders.js";

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
  setPersona();

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

export default async function initLazy() {
  loadAos();
  await fetchPlaceholders();
  await fetchPlaceholders('dev', 'dev-placeholders.json');
  loadPlaceholders(document.querySelector('main'));
  loadDmImages();
  pageAnalytics();
  loadSprite();
}
