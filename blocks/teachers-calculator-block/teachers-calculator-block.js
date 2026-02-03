import dataMapMoObj from './datamap.js';

export default function decorate(block) {
  // Set up authoring class prefixes
  dataMapMoObj.CLASS_PREFIXES = [
    'calculator-item',
    'calculator-sub-item',
    'calculator-inner-item',
  ];
  dataMapMoObj.addIndexed(block);

  const iframeId = block.querySelector(".form-item1 .form-inner-item1").innerText;
  const iframeLink = block.querySelector(".form-item2 .form-inner-item1 a").getAttribute("href");
  const iframeJsLink = block.querySelector(".form-item3 .form-inner-item1 a").getAttribute("href");

  // Create style element
  const style = document.createElement('style');
  style.textContent = 'iframe {width: 1px;min-width: 100%;}';
  
  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.id = 'termDepositTeachersMFrame';
  iframe.src = 'https://calculators.gbst.com/clients/teachers_mutual_bank/html/term_deposit_react.html';
  
  // Create inline script for iframe resize
  const inlineScript = document.createElement('script');
  inlineScript.textContent = `
    window.addEventListener('load', function () {
      iFrameResize({}, '#termDepositTeachersMFrame');
    });
  `;
  
  // Create external script for iframe resizer library
  const externalScript = document.createElement('script');
  externalScript.src = 'https://calculators.gbst.com/clients/standard_suite/lib/iframeResizer.min.js';
  
  // Append elements to the block
  block.appendChild(style);
  block.appendChild(iframe);
  block.appendChild(externalScript);
  block.appendChild(inlineScript);
 
}
