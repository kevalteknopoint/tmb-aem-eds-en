import './quick-links-analytics.js';

export default async function decorate(block) {
  const wrapperNode = block.querySelector('p');

  let mainNode = wrapperNode;

  if (wrapperNode?.querySelector('a')) mainNode = wrapperNode?.querySelector('a');

  mainNode?.childNodes?.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
      const newSpan = document.createElement('span');
      newSpan.className = 'quick-link-text';
      newSpan.textContent = node.textContent;
      node.replaceWith(newSpan);
    }
  });

  // ---------- Identified brand class and added to the container for specific style ----------- //

  const quickLinkContainer = document.querySelector('.quick-links-container');
  const bodyClassName = document.querySelector('body').className;
  const brandClassName = bodyClassName.split(' ')[0];
  quickLinkContainer.classList.add(brandClassName);
}
