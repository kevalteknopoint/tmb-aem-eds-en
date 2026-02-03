import dataMapMoObj from './datamap.js';

export default function decorate(block) {
  // Set up authoring class prefixes
  dataMapMoObj.CLASS_PREFIXES = [
    'calculator-item',
    'calculator-sub-item',
    'calculator-inner-item',
  ];
  dataMapMoObj.addIndexed(block);

  const iframeId = block.querySelector(".calculator-item1 .calculator-sub-item1").innerText;
  const iframeLink = block.querySelector(".calculator-item2 .calculator-inner-item1 a").getAttribute("href");
  const iframeJsLink = block.querySelector(".calculator-item3 .calculator-inner-item1 a").getAttribute("href");
  
  block.innerHTML = "";

  // Create style element
  const style = document.createElement('style');
  style.textContent = 'iframe {width: 1px;min-width: 100%; min-height:800px}';
  
  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.id = iframeId;
  iframe.src = iframeLink;
  
  // Create inline script for iframe resize
  const inlineScript = document.createElement('script');
  inlineScript.textContent = `
    setTimeout(function () {
      window.addEventListener('load', function () {
        iFrameResize({}, '#${iframeId}');
      });
    }, 1000);
  `;
  
  // Create external script for iframe resizer library
  const externalScript = document.createElement('script');
  externalScript.src = iframeJsLink;

  
  
  // Append elements to the block
  block.appendChild(style);
  block.appendChild(iframe);
  block.appendChild(inlineScript);
  block.appendChild(externalScript);
 
}
