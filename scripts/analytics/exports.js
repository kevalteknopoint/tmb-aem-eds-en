export function minifyText(str) {
    if (!str) return "";

    return str?.trim()?.toLowerCase();
}
export const GLOBAL_COMPONENT_CLASSES = [
    'bannervideo-wrapper',
    'quick-links',
    'online-banking',
    'banking-goods',
    'news-helpful',
    'news-helpful-homepage',
    'tmb-footer'
];
export function pageIntialization(pageName, pageType, siteSection, sitesubSection, pageLanguage, pageId, pageTemplate, performanceTier, brand, webType, backtrackFlag, helpVisitFlag, implementationVersion, domInteractiveTime, domInteractiveTimeBucket, firstContentfulPaint, firstContentfulPaintBucket, httpStatusCode, httpStatusGroup, trackingVersion, implementationEnvironment, dataLayerReadyFlag, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, product, primaryProductGroup, primaryProduct, multiProductFlag, personId, loginStatus, hasEverLoggedInFlag, visitorType) {
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
export function setPersona() {
    const personaSeq = [
        "Home Loan",
        "Personal Loan",
        "Credit Card",
        "Term Deposit",
        "Saving Account"
    ]

    const metaPersona = getMetadata('persona');
    if (!metaPersona) return;

    const localPersona = localStorage.getItem('persona');
    if (!localPersona) return localStorage.setItem('persona', metaPersona);
    if (personaSeq.includes(metaPersona)) {
        localStorage.setItem('persona', metaPersona)
    } else {
        localStorage.setItem('persona', "")
    }

    //  if (personaSeq.indexOf(metaPersona) < personaSeq.indexOf(localPersona)) localStorage.setItem('persona', metaPersona);
}

export function getPersona() {
    return localStorage.getItem('persona');
}
export function menuInteraction(pageRegion, leveloneMenu, leveltwoMenu, levelthreeMenu, componentName, componentType, componentIndex, componentPersona, nextpageUrl, interactionType, linkType, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "menuInteraction",
        "data": {
            "pageRegion": pageRegion,
            "leveloneMenu": leveloneMenu,
            "leveltwoMenu": leveltwoMenu,
            "levelthreeMenu": levelthreeMenu,
            "componentName": componentName,    //Human-readable slug for this component.e.g. apply-now, learn-more, tools-and-resources, faqs
            "componentType": componentType,   //UI pattern type.e.g. banner, tile-grid, rate-table, faq-accordion, form-section
            "componentIndex": componentIndex,  //Index for multiple similar components on a page.e.g. 01, 02, 03
            "componentPersona": componentPersona, //Intended persona / segment.e.g. first-home-buyer, teacher, health-professional, all-members
            "nextpageUrl": nextpageUrl,
            "interactionType": interactionType,   //Type of interaction fired.e.g. cta-click, menu-click, icon-click, faq-toggle, form-submit
            "linkType": linkType,
            "requiredFieldMissingFlag": requiredFieldMissingFlag,  //Yes if any required analytics fields missing on this hit.
            "testUserFlag": testUserFlag,   //Yes for known internal/testing users; No for normal traffic.
            "qaSessionFlag": qaSessionFlag,   //Yes if visit is part of QA session (to be filtered from prod dashboards).
            "componentId": componentId,     //Full component ID following your naming pattern.e.g. tmb_web_home-loans_product-landing_your-way-plus_hero_banner_apply-now_01_bau-consider_first-home-buyer
            "componentIdValidFlag": componentIdValidFlag //Yes if component_id conforms to naming convention; No if malformed/missing.
        }
    });
}


export function faqInteraction(pageRegion, faqTitle, ctaSource, componentName, componentType, componentIndex, componentPersona, interactionType, microengagementType, helpcontentId, helpContentType, faqAccordionToggleType, faqQuestionId, faqQuestionRank, searchSuccessFlag, searchResultClickPosition, searchResultType, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "faqInteraction",
        "data": {
            "pageRegion": pageRegion,
            "faqTitle": faqTitle,
            "ctaSource": ctaSource,
            "componentName": componentName,
            "componentType": componentType,
            "componentIndex": componentIndex,
            "componentPersona": componentPersona,
            "interactionType": interactionType,
            "microengagementType": microengagementType,
            "helpcontentId": helpcontentId,
            "helpContentType": helpContentType,
            "faqAccordionToggleType": faqAccordionToggleType,
            "faqQuestionId": faqQuestionId,
            "faqQuestionRank": faqQuestionRank,
            "searchSuccessFlag": searchSuccessFlag,
            "searchResultClickPosition": searchResultClickPosition,
            "searchResultType": searchResultType,
            "requiredFieldMissingFlag": requiredFieldMissingFlag,
            "testUserFlag": testUserFlag,
            "qaSessionFlag": qaSessionFlag,
            "componentId": componentId,
            "componentIdValidFlag": componentIdValidFlag
        }
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
export function bannerSearch(pageRegion, searchType, searchTerm, searchTermNormalized, searchResultCountBucket, searchRefinementFlag, componentName, componentType, componentIndex, componentPersona, interactionType, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "bannerSearch",
        "data": {
            "pageRegion": pageRegion,
            "searchType": searchType,
            "searchTerm": searchTerm,
            "searchTermNormalized": searchTermNormalized,
            "searchResultCountBucket": searchResultCountBucket,
            "searchRefinementFlag": searchRefinementFlag,
            "componentName": componentName,
            "componentType": componentType,
            "componentIndex": componentIndex,
            "componentPersona": componentPersona,
            "interactionType": interactionType,
            "requiredFieldMissingFlag": requiredFieldMissingFlag,
            "testUserFlag": testUserFlag,
            "qaSessionFlag": qaSessionFlag,
            "componentId": componentId,
            "componentIdValidFlag": componentIdValidFlag
        }
    });
}

export function breadcrumbItemClick(pageRegion, ctaText, nextpageUrl, interactionType, linkType, navElementType, navLocation, breadcrumbTrail, breadcrumbDepth, componentName, componentType, componentIndex, componentPersona, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "breadcrumbItemClick",
        "data": {
            "pageRegion": pageRegion,
            "ctaText": ctaText,
            "nextpageUrl": nextpageUrl,
            "interactionType": interactionType,
            "linkType": linkType,
            "navElementType": navElementType,
            "navLocation": navLocation,
            "breadcrumbTrail": breadcrumbTrail,
            "breadcrumbDepth": breadcrumbDepth,
            "componentName": componentName,
            "componentType": componentType,
            "componentIndex": componentIndex,
            "componentPersona": componentPersona,
            "requiredFieldMissingFlag": requiredFieldMissingFlag,
            "testUserFlag": testUserFlag,
            "qaSessionFlag": qaSessionFlag,
            "componentId": componentId,
            "componentIdValidFlag": componentIdValidFlag
        }
    });
}

export function downloadApp(pageRegion, iconName, ctaTitle, componentName, componentType, componentIndex, componentPersona, interactionType, linkType, navElementType, navLocation, componentId) {
    window.adobeDataLayer.push({
        "event": "downloadApp",
        "data": {
            "pageRegion": pageRegion,
            "iconName": iconName,
            "ctaTitle": ctaTitle,
            "componentName": componentName,
            "componentType": componentType,
            "componentIndex": componentIndex,
            "componentPersona": componentPersona,
            "interactionType": interactionType,
            "linkType": linkType,
            "navElementType": navElementType,
            "navLocation": navLocation,
            "componentId": componentId
        }
    });
}

//this function will fire when user click on any sub menu
export function subMenuClick(pageRegion,menuText,componentName,componentType,componentIndex,componentPersona,nextpageUrl,interactionType,navElementType,navLocation,linkType,componentId){
    window.adobeDataLayer.push({
        "event": "subMenuClick",
            "data":{
                "pageRegion":pageRegion,
                "menuText":menuText,
                "componentName":componentName,    
                "componentType":componentType,  
                "componentIndex":componentIndex,  
                "componentPersona":componentPersona,
                "nextpageUrl":nextpageUrl,
                "interactionType":interactionType,
                "navElementType":navElementType,
                "navLocation":navLocation,  
                "linkType":linkType,                
                "componentId":componentId                
            }
});
}


export function resetForm(pageRegion, componentName, componentType, componentIndex, componentPersona, interactionType, formId, formName, formType, formChannel, formProductGroup, formProduct, formVersion, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "resetForm",
        "data": {
            "pageRegion": pageRegion,
            "componentName": componentName,
            "componentType": componentType,
            "componentIndex": componentIndex,
            "componentPersona": componentPersona,
            "interactionType": interactionType,
            "formId": formId,
            "formName": formName,
            "formType": formType,
            "formChannel": formChannel,
            "formProductGroup": formProductGroup,
            "formProduct": formProduct,
            "formVersion": formVersion,
            "requiredFieldMissingFlag": requiredFieldMissingFlag,
            "testUserFlag": testUserFlag,
            "qaSessionFlag": qaSessionFlag,
            "componentId": componentId,
            "componentIdValidFlag": componentIdValidFlag
        }
    });
}
function getAllComponents() {
    return GLOBAL_COMPONENT_CLASSES
        .flatMap(className =>
            [...document.querySelectorAll(`.${className}`)]
        )
        .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
                ? -1
                : 1
        );
}
export function getPageRegion(element) {

    const components = getAllComponents();
    let currentComponent;
    try {
        currentComponent = element.closest(
            GLOBAL_COMPONENT_CLASSES.map(c => `.${c}`).join(',')
        );

    } catch (error) {
        void error
    }
    if (currentComponent) {
        const position = components.indexOf(currentComponent) + 1;
        const total = components.length;

        if (!position || total === 0) return "top";

        const perRegion = Math.ceil(total / 3);
        const regionNumber = Math.ceil(position / perRegion);
        if (regionNumber == 1) return "top"
        else if (regionNumber == 2) return "middle"
        else return "bottom"
    }
    //   return `homepage-region-${regionNumber}`;
}

export function getComponentIndex(clickedElement) {
    if (!clickedElement) return -1;

    const section = clickedElement.closest('.section[data-section-status]');
    if (!section) return -1;

    const main = section.closest('main');
    if (!main) return -1;

    const sections = Array.from(main.children).filter(child =>
        child.classList.contains('section')
    );

    return sections.indexOf(section) + 1;
}

export function sideWidgetInteraction(pageRegion, ctaText, ctaTitle, ctaSource, componentName, componentType, componentIndex, componentPersona, nextpageUrl, interactionType, linkType, navElementType, navLocation, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "sideWidgetInteraction",
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

export function socialmediaClick(pageRegion, iconName, componentName, componentType, componentIndex, componentPersona, interactionType, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag) {
    window.adobeDataLayer.push({
        "event": "socialmediaClick",
        "data": {
            "pageRegion": pageRegion,
            "iconName": iconName,
            "componentName": componentName,
            "componentType": componentType,
            "componentIndex": componentIndex,
            "componentPersona": componentPersona,
            "interactionType": interactionType,
            "requiredFieldMissingFlag": requiredFieldMissingFlag,
            "testUserFlag": testUserFlag,
            "qaSessionFlag": qaSessionFlag,
            "componentId": componentId,
            "componentIdValidFlag": componentIdValidFlag
        }
    });
}