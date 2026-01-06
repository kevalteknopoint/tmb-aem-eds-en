import dataMapMoObj from './datamap.js';

export default function decorate(block) {
  // Set up authoring class prefixes
  dataMapMoObj.CLASS_PREFIXES = [
    'calculator-item',
    'calculator-sub-item',
    'calculator-inner-item',
  ];
  dataMapMoObj.addIndexed(block);

  const iframeAnchor = block.querySelector('.calculator-item1 .calculator-inner-item1 a');
  const iframeLink = iframeAnchor ? iframeAnchor.getAttribute('href') : '';

  const cfg = { iframeLink };

  // Clear existing block content
  block.innerHTML = '';

  if (cfg.iframeLink) {
    const iframe = document.createElement('iframe');
    iframe.src = cfg.iframeLink;
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.allow = 'fullscreen';
    iframe.setAttribute('title', 'Embedded Form');

    block.appendChild(iframe);
  } else {
    const msg = document.createElement('p');
    msg.textContent = 'Please provide a valid iframe link in the editor.';
    block.appendChild(msg);
  }
}
