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

export default function decorate(block) {
  // Set up authoring class prefixes
  dataMapMoObj.CLASS_PREFIXES = [
    "calculator-item",
    "calculator-sub-item",
    "calculator-inner-item",
  ];
  dataMapMoObj.addIndexed(block);

  // Extract values with validation
  const iframeIdElement = block.querySelector(
    ".calculator-item1 .calculator-sub-item1",
  );
  const iframeLinkElement = block.querySelector(
    ".calculator-item2 .calculator-inner-item1 a",
  );
  const iframeJsLinkElement = block.querySelector(
    ".calculator-item3 .calculator-inner-item1 a",
  );

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

  block.appendChild(iframe);

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
}
