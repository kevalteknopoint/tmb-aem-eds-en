export function minifyText(str) {
  if (!str) return '';

  return str?.trim()?.toLowerCase();
}

export function pageIntialization(
  pageName,
  pageType,
  siteSection,
  sitesubSection,
  pageLanguage,
  pageRegion,
  brand,
  webType,
  componentType,
  componentName,
  componentIndex,
  campaign,
  persona,
  product
) {
  window.adobeDataLayer.push({
    event: "pageInitialization",
    page: {
      name: pageName,
      pageType,
      pageURL: window.location.href,
      pathName: window.location.pathname,
      siteSection,
      sitesubSection,
      pageLanguage,
      pageTitle: document.title,
    },
    data: {
      pageRegion,
      brand,
      webType,
      componentType,
      componentName,
      componentIndex,
      campaign,
      persona,
    },
    products: {
      product,
    },
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
