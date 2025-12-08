import { div, form } from "../../scripts/dom-helpers.js";
import dataMapMoObj from "./datamap.js";

// Track loaded resources to prevent duplicates
const loadedResources = {
  css: new Set(),
  js: new Set(),
};

// Helper to safely get text content
function getTextContent(block, selector) {
  const el = block.querySelector(selector);
  return el?.innerText?.trim() || '';
}

// Helper to safely get href
function getHref(block, selector) {
  const el = block.querySelector(selector);
  return el?.getAttribute('href') || '';
}

// Function to load external script (deduplicated)
function loadScript(src) {
  if (!src) return Promise.reject(new Error('No script source provided'));
  
  // Return existing promise if already loading
  if (loadedResources.js.has(src)) {
    return Promise.resolve();
  }

  // Check if script already exists in DOM
  if (document.querySelector(`script[src="${src}"]`)) {
    loadedResources.js.add(src);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      loadedResources.js.add(src);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

// Function to inject CSS (deduplicated)
function injectCSS(href) {
  if (!href || loadedResources.css.has(href)) return;
  
  // Check if link already exists
  if (document.querySelector(`link[href="${href}"]`)) {
    loadedResources.css.add(href);
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
  loadedResources.css.add(href);
}

let formInstanceCounter = 0;


export default function decorate(block) {
  if (!block) {
    console.error('teachers-form-block: No block element provided');
    return;
  }

  try {
    dataMapMoObj.CLASS_PREFIXES = [
      "form-item",
      "form-sub-item",
      "form-inner-item",
    ];
    dataMapMoObj.addIndexed(block);

    // Extract configuration with null checks
    const cfg = {
      css: getHref(block, '.form-item1 .form-inner-item1 a'),
      js: getHref(block, '.form-item2 .form-inner-item1 a'),
      id: getTextContent(block, '.form-item3 .form-inner-item1'),
      key: getTextContent(block, '.form-item4 .form-inner-item1'),
      action: getHref(block, '.form-item5 .form-inner-item1 a'),
      envt: getTextContent(block, '.form-item6 .form-inner-item1'),
      channel: getTextContent(block, '.form-item7 .form-inner-item1'),
      config: getTextContent(block, '.form-item8 .form-inner-item1'),
      container: getTextContent(block, '.form-item9 .form-inner-item1'),
    };

    // Validate required fields
    if (!cfg.id || !cfg.key || !cfg.js) {
      console.error('teachers-form-block: Missing required configuration (id, key, or js)');
      block.innerHTML = '<p>Form configuration is incomplete.</p>';
      return;
    }

    // Generate unique form ID to avoid conflicts
    formInstanceCounter += 1;
    const formContainerId = `${cfg.container}-${formInstanceCounter}`;

    block.innerHTML = "";

    // Build form wrapper
    const formEl = form({
      method: "post",
      action: cfg.action || '#',
      id: `WebForm-${formInstanceCounter}`,
      novalidate: true,
    });

    const wrapper = div(
      { class: "formatic" },
      div({ id: formContainerId })
    );
    formEl.appendChild(wrapper);
    block.appendChild(formEl);

    // Inject CSS
    if (cfg.css) {
      injectCSS(cfg.css);
    }

    // Load JS and initialize Formatic
    if (cfg.js) {
      loadScript(cfg.js)
        .then(() => {
          if (typeof window.Formatic === 'undefined') {
            throw new Error('Formatic library not available after loading script');
          }

          window.Formatic.createForm(
            formContainerId,
            cfg.id,
            cfg.key,
            cfg.envt,
            cfg.channel,
            cfg.config
          );
        })
        .catch((err) => {
          console.error('teachers-form-block: Failed to initialize form', err);
          const errorMsg = div(
            { class: 'form-error' },
            'Unable to load form. Please try again later.'
          );
          block.querySelector('.formatic')?.appendChild(errorMsg);
        });
    }
  } catch (err) {
    console.error('teachers-form-block: Decoration failed', err);
    block.innerHTML = '<p>An error occurred while loading the form.</p>';
  }
}
