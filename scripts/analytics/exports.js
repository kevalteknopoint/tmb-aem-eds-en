export function minifyText(str) {
  if (!str) return "";

  return str?.trim()?.toLowerCase();
}

export function pageintialization(pageName, pageType, siteSection, sitesubSection, pageLanguage, pageId, pageTemplate, performanceTier, brand, webType, backtrackFlag, helpVisitFlag, implementationVersion, domInteractiveTime, domInteractiveTimeBucket, firstContentfulPaint, firstContentfulPaintBucket, httpStatusCode, httpStatusGroup, trackingVersion, implementationEnvironment, dataLayerReadyFlag, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, product, primaryProductGroup, primaryProduct, multiProductFlag, personId, loginStatus, hasEverLoggedInFlag, visitorType) {
  window.adobeDataLayer.push({
    "event": "pageInitialization",
    "page": {
      "name": pageName, // for home page it will be Home
      "pageType": pageType, //home page, Product Page or Other Page
      "pageURL": location.href, // will take it automaticly
      "pathName": location.pathname, // will take it automaticly
      "siteSection": siteSection,  //Top-level area of site.e.g. home, home-loans, savings, help, about, rates, campaign.
      "sitesubSection": sitesubSection,  //Second-level grouping under site_section.e.g. owner-occupier, investor, faqs, calculators.
      "pageLanguage": pageLanguage,
      "pageTitle": document.title,
      "pageId": pageId,     //Internal page identifier from AEM / app router.e.g. hl-your-way-plus.
      "pageTemplate": pageTemplate,    //Template used by the page.e.g. product-landing, campaign-landing, faq, help-article, tool-page.
      "performanceTier": performanceTier    //e.g. good, needs-improvement, poor based on thresholds.
    },
    "data": {
      "brand": brand,   //TMBL brand associated with the hit.e.g. tmb, hpb, fmb, unibank, tmbl, broker
      "webType": webType,   //High-level surface.e.g. web (public website), ib (internet banking), mobile-app
      "backtrackFlag": backtrackFlag, //Yes if user navigates back to previous page (via back button or link).
      "helpVisitFlag": helpVisitFlag,  //Yes if the visit contained any Help/FAQ pages; No otherwise.
      "implementationVersion": implementationVersion,  //pass as DL_v1.0
      "domInteractiveTime": domInteractiveTime,  //Time until DOM becomes interactive.
      "domInteractiveTimeBucket": domInteractiveTimeBucket,  //e.g. <1000ms, 1000–3000ms, 3001–5000ms, >5000ms.
      "firstContentfulPaint": firstContentfulPaint,  //FCP timing for the page.
      "firstContentfulPaintBucket": firstContentfulPaintBucket,  //Performance buckets for FCP.
      "httpStatusCode": httpStatusCode,   //HTTP response code for the page or key API call.e.g. 200, 302, 404, 500.
      "httpStatusGroup": httpStatusGroup,  //e.g. 2xx-success, 3xx-redirect, 4xx-client-error, 5xx-server-error.
      "trackingVersion": trackingVersion,     //pass as cja_tags_2026
      "implementationEnvironment": implementationEnvironment, //uat/prod
      "dataLayerReadyFlag": dataLayerReadyFlag,  //Yes if data layer initialised correctly before tracking; No if fallback path used.
      "requiredFieldMissingFlag": requiredFieldMissingFlag,  //Yes if any required analytics fields missing on this hit.
      "testUserFlag": testUserFlag,   //Yes for known internal/testing users; No for normal traffic.
      "qaSessionFlag": qaSessionFlag   //Yes if visit is part of QA session (to be filtered from prod dashboards).
    },
    "products": {
      "product": product,  //pass product name on product pages
      "primaryProductGroup": primaryProductGroup,  //High-level product category for the page.e.g. home-loan, savings, everyday, term-deposit, credit-card.
      "primaryProduct": primaryProduct,  //Specific product slug where applicable.e.g. your-way-plus, everyday-direct, starter-saver.
      "multiProductFlag": multiProductFlag  //Yes if the page covers multiple products (comparison, overview); No if single-product.
    },
    "user": {
      "personId": personId,   //Stable identifier for an individual across sessions/devices where identity is known.
      "loginStatus": loginStatus,  //e.g. logged-in, anonymous, guest.
      "hasEverLoggedInFlag": hasEverLoggedInFlag,  //Yes if the person has ever had a logged-in event in their history.
      "visitorType": visitorType  //e.g. anonymous-web-only, secure-user (has IB/app), mixed-web-secure.
    }
  });
}

export function menuInteraction(
  pageRegion,
  leveloneMenu,
  leveltwoMenu,
  levelthreeMenu,
  componentName,
  componentType,
  componentIndex
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
    },
  });
}

export function faqInteraction(
  pageRegion,
  faqTitle,
  ctaSource,
  componentName,
  componentType,
  componentIndex
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
    },
  });
}

export function ctaInteraction(pageRegion, ctaText, ctaTitle, ctaSource, componentName, componentType, componentIndex, componentPersona, nextpageUrl, interactionType, linkType, navElementType, navLocation, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
  window.adobeDataLayer.push({
    "event": "ctaInteraction",
    "data": {
      "pageRegion": pageRegion,
      "ctaText": ctaText,
      "ctaTitle": ctaTitle,
      "ctaSource": ctaSource,
      "componentName": componentName,
      "componentType": componentType,
      "componentIndex": componentIndex,
      "componentPersona": componentPersona,
      "nextpageUrl": nextpageUrl,
      "interactionType": interactionType,
      "linkType": linkType,
      "navElementType": navElementType,
      "navLocation": navLocation,
      "requiredFieldMissingFlag": requiredFieldMissingFlag,
      "testUserFlag": testUserFlag,
      "qaSessionFlag": qaSessionFlag,
      "componentId": componentId,
      "componentIdValidFlag": componentIdValidFlag
    }
  });
}
export function bannerInteraction(pageRegion, ctaText, bannerName, bannerPosition, componentName, componentType, componentIndex, componentPersona, nextpageUrl, interactionType, linkType, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
  window.adobeDataLayer.push({
    "event": "bannerInteraction",
    "data": {
      "pageRegion": pageRegion,
      "ctaText": ctaText,
      "bannerName": bannerName,
      "bannerPosition": bannerPosition,
      "componentName": componentName,
      "componentType": componentType,
      "componentIndex": componentIndex,
      "componentPersona": componentPersona,
      "nextpageUrl": nextpageUrl,
      "interactionType": interactionType,
      "linkType": linkType,
      "requiredFieldMissingFlag": requiredFieldMissingFlag,
      "testUserFlag": testUserFlag,
      "qaSessionFlag": qaSessionFlag,
      "componentId": componentId,
      "componentIdValidFlag": componentIdValidFlag
    }
  });
}

export function socialmediaClick(
  pageRegion,
  iconName,
  componentName,
  componentType,
  componentIndex
) {
  window.adobeDataLayer.push({
    event: "socialmediaClick",
    data: {
      pageRegion,
      iconName,
      componentName,
      componentType,
      componentIndex,
    },
  });
}
