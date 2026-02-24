import { injectIcon } from "../../scripts/aem.js";
import { details, div, summary } from "../../scripts/dom-helpers.js";
import dataMapMoObj from "./datamap.js";

function initializeIframeResize(iframeId) {
  // Wait for iframe to load, then initialize resize
  const iframe = document.getElementById(iframeId);
  if (iframe && window.iFrameResize) {
    iframe.addEventListener("load", () => {
      setTimeout(() => {
        try {
          window.iFrameResize({}, `#${iframeId}`);
        } catch (error) {
          console.error("Error initializing iFrameResize:", error);
        }
      }, 500);
    });
  }
}

export default function decorate(mainBlock) {
  const singleExpansion = mainBlock.classList.contains("single-expansion");

  [...mainBlock.children].forEach((block) => {
    const isActive = block.firstElementChild?.textContent;
    const accordionTitle = block.querySelector('div:nth-child(2)');

    const clonedTitle = accordionTitle?.cloneNode(true);
    const summaryBlock = summary({ class: 'accordion-item-label' }, clonedTitle);
    injectIcon('chevron-up-round', summaryBlock);

    const detailsBlock = details({ class: 'accordion-item' }, summaryBlock);
    if (isActive === 'true') detailsBlock.setAttribute('open', true);

    block.firstElementChild?.remove();
    accordionTitle?.remove();

    dataMapMoObj.CLASS_PREFIXES = [
      "calculator-item",
      "calculator-sub-item",
      "calculator-inner-item",
    ];
    dataMapMoObj.addIndexed(block);

    // Extract values with validation
    const iframeIdElement = block.querySelector(".calculator-item1 .calculator-sub-item1",);
    const iframeLinkElement = block.querySelector(".calculator-item2 .calculator-inner-item1",);
    const iframeJsLinkElement = block.querySelector(".calculator-item3 .calculator-inner-item1",);

    if (!iframeIdElement || !iframeLinkElement || !iframeJsLinkElement) {
      console.error("Calculator block: Missing required elements");
      return;
    }

    const iframeId = iframeIdElement.innerText.trim();
    const iframeLink = iframeLinkElement.getAttribute("href");
    const iframeJsLink = iframeJsLinkElement.getAttribute("href");

    if (!iframeId || !iframeLink || !iframeJsLink) {
      console.error("Calculator block: Missing required data");
      return;
    }

    block.innerHTML = "";

    // Create iframe element with proper attributes
    const iframe = document.createElement("iframe");
    iframe.id = iframeId;
    iframe.src = iframeLink;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", "Calculator");
    iframe.style.width = "1px";
    iframe.style.minWidth = "100%";
    iframe.style.border = "0";

    const accordionBody = div({ class: 'accordion-body' }, iframe);
    detailsBlock.appendChild(accordionBody);
    block.replaceWith(detailsBlock);

    // Load external script only once (check if already loaded)
    if (!window.iFrameResize) {
      const externalScript = document.createElement("script");
      externalScript.src = iframeJsLink;
      externalScript.onload = () => {
        initializeIframeResize(iframeId);
      };
      externalScript.onerror = () => {
        console.error("Failed to load iFrameResize library");
      };
      document.head.appendChild(externalScript);
    } else {
      initializeIframeResize(iframeId);
    }
  });

  if (singleExpansion) {
    mainBlock.querySelectorAll('.accordion-item').forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          document.querySelectorAll('.accordion-item').forEach((other) => {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  }
}
