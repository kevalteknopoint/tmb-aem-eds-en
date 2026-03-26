import { getMetadata } from "../aem.js";

export function minifyText(str) {
  if (!str) return "";
  return str?.trim()?.toLowerCase();
}

export const GLOBAL_COMPONENT_CLASSES = [
  "bannervideo-wrapper",
  "quick-links",
  "online-banking",
  "banking-goods",
  "news-helpful",
  "news-helpful-homepage",
  "tmb-footer",
];

export function pageIntialization(pageName,pageType,siteSection,sitesubSection,pageLanguage,pageId,pageTemplate,performanceTier,brand,webType,domInteractiveTime,domInteractiveTimeBucket,firstContentfulPaint,firstContentfulPaintBucket,httpStatusCode,httpStatusGroup,product,loginStatus,hasEverLoggedInFlag,visitorType){
window.adobeDataLayer.push({
    "event": "pageInitialization",
        "page":{
            "name": pageName, // for home page it will be Home
            "pageType":pageType, //home page, Product Page or Other Page
            "pageURL":location.href, // will take it automaticly
            "pathName":location.pathname, // will take it automaticly
            "siteSection":siteSection,  //Top-level area of site.e.g. home, home-loans, savings, help, about, rates, campaign.
            "sitesubSection":sitesubSection,  //Second-level grouping under site_section.e.g. owner-occupier, investor, faqs, calculators.
            "pageLanguage":pageLanguage,
            "pageTitle":document.title,
            "pageId":pageId,     //Internal page identifier from AEM / app router.e.g. hl-your-way-plus.
            "pageTemplate":pageTemplate,    //Template used by the page.e.g. product-landing, campaign-landing, faq, help-article, tool-page.
            "performanceTier":performanceTier    //e.g. good, needs-improvement, poor based on thresholds.
        },
        "data":{
            "brand":brand,   //TMBL brand associated with the hit.e.g. tmb, hpb, fmb, unibank, tmbl, broker
            "webType":webType,   //High-level surface.e.g. web (public website), ib (internet banking), mobile-app      
            "domInteractiveTime":domInteractiveTime,  //Time until DOM becomes interactive.
            "domInteractiveTimeBucket":domInteractiveTimeBucket,  //e.g. <1000ms, 1000–3000ms, 3001–5000ms, >5000ms.
            "firstContentfulPaint":firstContentfulPaint,  //FCP timing for the page.
            "firstContentfulPaintBucket":firstContentfulPaintBucket,  //Performance buckets for FCP.
            "httpStatusCode":httpStatusCode,   //HTTP response code for the page or key API call.e.g. 200, 302, 404, 500.
            "httpStatusGroup":httpStatusGroup  //e.g. 2xx-success, 3xx-redirect, 4xx-client-error, 5xx-server-error
        },
        "products":{
            "product":product  //pass product name on product pages
        },
        "user":{
            "loginStatus":loginStatus,  //e.g. logged-in, anonymous, guest.
            "hasEverLoggedInFlag":hasEverLoggedInFlag,  //Yes if the person has ever had a logged-in event in their history.
            "visitorType":visitorType  //e.g. anonymous-web-only, secure-user (has IB/app), mixed-web-secure.
        }
});
}



export function setPersona() {
  const personaSeq = [
    "Home Loan",
    "Personal Loan",
    "Credit Card",
    "Term Deposit",
    "Saving Account",
  ];

  const metaPersona = getMetadata("persona");
  if (!metaPersona) return;

  const localPersona = localStorage.getItem("persona");
  if (!localPersona) {
    localStorage.setItem("persona", metaPersona);
    return;
  }
  if (personaSeq.includes(metaPersona)) {
    localStorage.setItem("persona", metaPersona);
  } else {
    localStorage.setItem("persona", "");
  }
}

export function getPersona() {
  return localStorage.getItem("persona");
}

export function menuInteraction(
  pageRegion,
  leveloneMenu,
  leveltwoMenu,
  levelthreeMenu,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  nextpageUrl,
  interactionType,
  linkType,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "menuInteraction",
    data: {
      pageRegion,
      leveloneMenu,
      leveltwoMenu,
      levelthreeMenu,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      nextpageUrl,
      interactionType,
      linkType,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function faqInteraction(
  pageRegion,
  faqTitle,
  ctaSource,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  interactionType,
  microengagementType,
  helpcontentId,
  helpContentType,
  faqAccordionToggleType,
  faqQuestionId,
  faqQuestionRank,
  searchSuccessFlag,
  searchResultClickPosition,
  searchResultType,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "faqInteraction",
    data: {
      pageRegion,
      faqTitle,
      ctaSource,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      interactionType,
      microengagementType,
      helpcontentId,
      helpContentType,
      faqAccordionToggleType,
      faqQuestionId,
      faqQuestionRank,
      searchSuccessFlag,
      searchResultClickPosition,
      searchResultType,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function ctaInteraction(
  pageRegion,
  ctaText,
  ctaTitle,
  ctaSource,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  nextpageUrl,
  interactionType,
  linkType,
  navElementType,
  navLocation,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "ctaInteraction",
    data: {
      pageRegion,
      ctaText,
      ctaTitle,
      ctaSource,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      nextpageUrl,
      interactionType,
      linkType,
      navElementType,
      navLocation,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function bannerInteraction(
  pageRegion,
  ctaText,
  bannerName,
  bannerPosition,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  nextpageUrl,
  interactionType,
  linkType,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "bannerInteraction",
    data: {
      pageRegion,
      ctaText,
      bannerName,
      bannerPosition,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      nextpageUrl,
      interactionType,
      linkType,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function bannerSearch(
  pageRegion,
  searchType,
  searchTerm,
  searchTermNormalized,
  searchResultCountBucket,
  searchRefinementFlag,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  interactionType,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "bannerSearch",
    data: {
      pageRegion,
      searchType,
      searchTerm,
      searchTermNormalized,
      searchResultCountBucket,
      searchRefinementFlag,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      interactionType,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function breadcrumbItemClick(
  pageRegion,
  ctaText,
  nextpageUrl,
  interactionType,
  linkType,
  navElementType,
  navLocation,
  breadcrumbTrail,
  breadcrumbDepth,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "breadcrumbItemClick",
    data: {
      pageRegion,
      ctaText,
      nextpageUrl,
      interactionType,
      linkType,
      navElementType,
      navLocation,
      breadcrumbTrail,
      breadcrumbDepth,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function downloadApp(
  pageRegion,
  iconName,
  ctaTitle,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  interactionType,
  linkType,
  navElementType,
  navLocation,
  componentId,
) {
  window.adobeDataLayer.push({
    event: "downloadApp",
    data: {
      pageRegion,
      iconName,
      ctaTitle,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      interactionType,
      linkType,
      navElementType,
      navLocation,
      componentId,
    },
  });
}
//this function will fire when any document gets downloaded or redirected to downloadable page
export function downloadDocument(pageRegion, componentName, componentType, componentIndex, componentPersona, componentId, nextpageUrl, interactionType, navElementType, navLocation, ctaText, documentType, linkType) {
  window.adobeDataLayer.push({
    "event": "downloadDocument",
    "data": {
      "pageRegion": pageRegion,
      "componentName": componentName,
      "componentType": componentType,
      "componentIndex": componentIndex,
      "componentPersona": componentPersona,
      "componentId": componentId,
      "nextpageUrl": nextpageUrl,
      "interactionType": interactionType,
      "navElementType": navElementType,
      "navLocation": navLocation,
      "ctaText": ctaText,
      "documentType": documentType,
      "linkType": linkType
    }
  });
}
//this function will fire when user click on any side nav menu item
export function sideNavMenuClick(pageRegion,leveloneMenu,leveltwoMenu,componentName,componentType,componentIndex,componentPersona,nextpageUrl,interactionType,linkType,componentId){
    window.adobeDataLayer.push({
        "event": "sideNavMenuClick",
            "data":{
                "pageRegion":pageRegion,
                "leveloneMenu":leveloneMenu,
                "leveltwoMenu":leveltwoMenu,
                "componentName":componentName,    
                "componentType":componentType,  
                "componentIndex":componentIndex,  
                "componentPersona":componentPersona, 
                "nextpageUrl":nextpageUrl,
                "interactionType":interactionType,   
                "linkType":linkType,
                "componentId":componentId     
            }
});
}


export function subMenuClick(
  pageRegion,
  menuText,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  nextpageUrl,
  interactionType,
  navElementType,
  navLocation,
  linkType,
  componentId,
) {
  window.adobeDataLayer.push({
    event: "subMenuClick",
    data: {
      pageRegion,
      menuText,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      nextpageUrl,
      interactionType,
      navElementType,
      navLocation,
      linkType,
      componentId,
    },
  });
}

export function resetForm(
  pageRegion,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  interactionType,
  formId,
  formName,
  formType,
  formChannel,
  formProductGroup,
  formProduct,
  formVersion,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "resetForm",
    data: {
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      interactionType,
      formId,
      formName,
      formType,
      formChannel,
      formProductGroup,
      formProduct,
      formVersion,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function getAllComponents() {
  return GLOBAL_COMPONENT_CLASSES.flatMap((className) => [
    ...document.querySelectorAll(`.${className}`),
  ]).sort((a, b) =>
    // eslint-disable-next-line no-bitwise
    (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
  );
}

export const getPageRegion = (element) => {
  if (!element) return "";
  const section = element.closest(".section");
  if (!section) return "";
  const rect = section.getBoundingClientRect();
  const sectionTop = rect.top + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const positionRatio = sectionTop / pageHeight;

  if (positionRatio <= 0.33) return "top";
  if (positionRatio <= 0.66) return "middle";
  return "bottom";
};

export function getComponentIndex(clickedElement) {
  if (!clickedElement) return -1;
  const section = clickedElement.closest(".section[data-section-status]");
  if (!section) return -1;
  const main = section.closest("main");
  if (!main) return -1;
  const sections = Array.from(main.children).filter((child) =>
    child.classList.contains("section"),
  );
  return sections.indexOf(section) + 1;
}

export function socialmediaClick(
  pageRegion,
  iconName,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  interactionType,
  requiredFieldMissingFlag,
  testUserFlag,
  qaSessionFlag,
  componentId,
  componentIdValidFlag,
) {
  window.adobeDataLayer.push({
    event: "socialmediaClick",
    data: {
      pageRegion,
      iconName,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      interactionType,
      requiredFieldMissingFlag,
      testUserFlag,
      qaSessionFlag,
      componentId,
      componentIdValidFlag,
    },
  });
}

export function searchInitiate(
  pageRegion,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  interactionType,
  componentId,
) {
  window.adobeDataLayer.push({
    event: "searchInitiate",
    data: {
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      interactionType,
      componentId,
    },
  });
}

export function popularSearchClick(
  pageRegion,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  componentId,
  nextpageUrl,
  interactionType,
  navElementType,
  navLocation,
  searchType,
  searchTerm,
  ctaTitle,
) {
  window.adobeDataLayer.push({
    event: "popularSearchClick",
    data: {
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      componentId,
      nextpageUrl,
      interactionType,
      navElementType,
      navLocation,
      searchType,
      searchTerm,
      ctaTitle,
    },
  });
}

export function suggestedSearchClick(
  pageRegion,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  componentId,
  nextpageUrl,
  interactionType,
  navElementType,
  navLocation,
  searchType,
  searchTerm,
  selectedSearchTerm,
  ctaTitle,
) {
  window.adobeDataLayer.push({
    event: "suggestedSearchClick",
    data: {
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      componentId,
      nextpageUrl,
      interactionType,
      navElementType,
      navLocation,
      searchType,
      searchTerm,
      selectedSearchTerm,
      ctaTitle,
    },
  });
}

export function internalSearch(
  pageRegion,
  componentName,
  componentType,
  componentIndex,
  componentPersona,
  componentId,
  interactionType,
  searchType,
  searchTerm,
  noofSearchResults,
) {
  window.adobeDataLayer.push({
    event: "internalSearch",
    data: {
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      componentPersona,
      componentId,
      interactionType,
      searchType,
      searchTerm,
      noofSearchResults,
    },
  });
}
