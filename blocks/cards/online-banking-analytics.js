import { ctaInteraction, minifyText, getPageRegion, getPersona, getComponentIndex,downloadApp} from "../../scripts/analytics/exports.js";

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
  const ctaTitle = e.target.closest('.online-banking .banking-li-1 .cards-card-body')?.querySelector('h2');
  const nextPageURL = e.target.closest('.online-banking .banking-li-1 .cards-card-body ul li a')?.getAttribute("href");;

  if (clickedAnchor) {
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
  }
  if (e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a")) {
    // const secondaryLink = e.target.closest('.quick-links-container').querySelector("card-bottom-2 a");
    const pageRegion = getPageRegion(e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a"));
    const componentIndex = getComponentIndex(e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a"));
    const ctaLink = e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a");
    const ctaTitle = e.target.closest('.online-banking .banking-li-2').querySelector('.banking-desc-1');
    const nextPageURL = e.target.closest('.online-banking .banking-li-2').querySelector(".card-bottom-2 a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitle?.textContent), '', 'online-banking', 'cards-container', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'online-banking', '');
  }
 const badgeLink = e.target.closest('.online-banking .banking-li-3')?.querySelector(".card-bottom-2.is-badge-link a");

if (e.target.closest('.online-banking .banking-li-3')?.querySelector(".card-bottom-2.is-badge-link a")) {

  const clickedBadge = e.target.closest('a'); // the actual clicked <a>

  let iconName = '';
  if (clickedBadge?.querySelector('.icon-google-play-badge')) {
    iconName = 'google play';
  } else if (clickedBadge?.querySelector('.icon-app-store-badge')) {
    iconName = 'app store';
  }

  const pageRegion = getPageRegion(badgeLink);
  const componentIndex = getComponentIndex(badgeLink);
const parentCard = e.target.closest('.online-banking .banking-li-3');

const ctaTitle = parentCard
  ?.querySelector('.card-bottom-1 .banking-desc-1');


  downloadApp(
    pageRegion,
    iconName, 
    minifyText(ctaTitle?.textContent),
    'online banking',
    'cards container',
    componentIndex,
    getPersona(),
    'cta-click',
    'download',
    '',
    'internal',
    'online banking',
  );
}
  
});
