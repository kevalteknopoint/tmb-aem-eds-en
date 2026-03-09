import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.legal-tc-guide a');
  if (!link) return;

  const block = link.closest('.legal-tc-guide');

  const pageRegion = getPageRegion(link);
  const componentIndex = getComponentIndex(block);
  const ctaTitle = block.querySelector('h1, h2, h3, h4, h5, h6');

  const ctaText = minifyText(link.textContent);
  const nextPageURL = link.href;

  console.log("clicked link:", link);
  console.log("text:", ctaText);
  console.log("url:", nextPageURL);

  ctaInteraction(
    pageRegion,
    ctaText,
    minifyText(ctaTitle?.textContent),
    '',
    'legal tc guide',
    'legal tc guide',
    componentIndex,
    getPersona(),
    nextPageURL,
    'cta-click',
    'internal',
    'quick-link',
    'internal',
    '',
    '',
    '',
    'legaltc',
    ''
  );
});
