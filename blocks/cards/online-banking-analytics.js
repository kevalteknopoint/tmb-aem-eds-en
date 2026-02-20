import { ctaInteraction, minifyText, getPageRegion, getPersona,getComponentIndex } from "../../scripts/analytics/exports.js";

// document.addEventListener('click', (e) => {
//   if (e.target.closest('.online-banking .banking-li-1').querySelector("ul li a")) {
//     const secondaryLink = e.target.closest('.online-banking .banking-li-1').querySelector("ul li a");
//     const pageRegion = getPageRegion(e.target.closest('.online-banking .banking-li-1').querySelector("ul li a"));
//     ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent) , '', '','banking/savings/loans','','',getPersona(),'cta-click','internal','quick-link','in-content','','','','','','');
//   }   
// });
document.addEventListener('click', (e) => {

  const clickedAnchor = e.target.closest('.online-banking .banking-li-1 ul li a');
  const componentIndex = getComponentIndex(e.target.closest('.online-banking .banking-li-1 ul li a'));
  const ctaTitle =e.target.closest('.online-banking .banking-li-1 .cards-card-body').querySelector('h2');
  const nextPageURL = e.target.closest('.online-banking .banking-li-1 .cards-card-body ul li a')?.getAttribute("href");;
  
  if (!clickedAnchor) return;

  const pageRegion = getPageRegion(clickedAnchor);

  ctaInteraction(
    pageRegion,
    minifyText(clickedAnchor.textContent),
    minifyText(ctaTitle.textContent),
    '',
    'online-banking',
    '',
    componentIndex,
    getPersona(),
    nextPageURL,
    'cta-click',
    'internal',
    'quick-link',
    'in-content',
    '',
    '',
    '',
    'online-banking',
    ''
  );

});

