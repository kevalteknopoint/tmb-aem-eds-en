import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex, downloadDocument } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.accordion-container .button-container')) {
    const secondaryLink = e.target.closest('.accordion-container .accordion-wrapper .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.accordion-container .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.accordion-container .button-container a'));
    const ctaTitle = e.target.closest('.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".accordion-container .button-container a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'faq links', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'faq links', '', '', '', '');
  }

  if (e.target.closest('.tmb-acc-sec.accordion-container .button-container')) {
    const secondaryLink = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.tmb-acc-sec.accordion-container .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.tmb-acc-sec.accordion-container .button-container a'));
    const ctaTitle = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".tmb-acc-sec.accordion-container .button-container a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'faq links', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'faq links', '', '', '', '');
  }

  //   if (e.target.closest('.who-can-apply-section.accordion-container ul li')) {
  //   const secondaryLink = e.target.closest('.accordion-container .accordion-wrapper ul li a');
  //   const pageRegion = getPageRegion(e.target.closest('.accordion-container ul li a'));
  //   const componentIndex = getComponentIndex(e.target.closest('.accordion-container ul li a'));
  //   const ctaTitle = e.target.closest('.accordion-container .accordion-wrapper').querySelector('p');
  //   const nextPageURL = e.target.closest(".accordion-container ul li a")?.getAttribute("href");
  //   ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'faq links', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'faq links', '', '', '', '');
  // }

  if (e.target.closest('.tmb-acc-sec.accordion-container ol li')) {
    const secondaryLink = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper li a');
    const pageRegion = getPageRegion(e.target.closest('.tmb-acc-sec.accordion-container li a'));
    const componentIndex = getComponentIndex(e.target.closest('.tmb-acc-sec.accordion-container li a'));
    const ctaTitle = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".tmb-acc-sec.accordion-container li a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'faq links', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'faq links', '', '', '', '');
  }
  const ctaLink = e.target.closest('.who-can-apply-section.accordion-container ul li a');

  if (!ctaLink) return;

  // const listItem = ctaLink.closest('li');
  const accordionItem = ctaLink.closest('.accordion-item');

  // Year (from <summary><p>)
  const yearTitle = accordionItem?.querySelector('summary p');
  const pageRegion = getPageRegion(ctaLink);
  const componentIndex = getComponentIndex(ctaLink);
  const nextPageURL = ctaLink.getAttribute("href");
  const persona = getPersona();
  const ctaText = minifyText(ctaLink.textContent);
  const titleText = minifyText(yearTitle?.textContent);
  const sectionEl = ctaLink.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || "";
  // File detection
  const fileExtensions = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
    'ppt', 'pptx', 'zip', 'rar', 'txt'
  ];

  const cleanUrl = nextPageURL?.split('?')[0]?.toLowerCase();
  const fileExt = cleanUrl?.split('.').pop();
  const isDownload = fileExtensions.includes(fileExt);

  if (isDownload) {
    downloadDocument(
      pageRegion,
      'faq links',
      'accordion-container',
      componentIndex,
      persona,
      '',
      nextPageURL,
      'cta-link',
      'internal',
      'in-content',
      ctaText,
      fileExt,
      componentId
    );
    return;
  }

  ctaInteraction(
    pageRegion,
    ctaText,
    titleText,
    '',
    'faq links',
    'accordion-container',
    componentIndex,
    persona,
    nextPageURL,
    'cta-link',
    'internal',
    'quick-link',
    'in-content',
    '',
    '',
    '',
    componentId,
    '',
    '',
    ''
  );
});
