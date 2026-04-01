import { breadcrumbItemClick, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.breadcrumb-container')) {
    const breadcrumblevel = e.target.closest('.breadcrumb-container').querySelector(".breadcrumb").innerText.replace(/[\n\r]+/g, '');
    const level = e.target.closest('.breadcrumb-container').querySelector(".breadcrumb").innerText.split("/").length;
    const secondaryLink = e.target.closest('.breadcrumb-container .breadcrumb a');
    const pageRegion = getPageRegion(e.target.closest('.breadcrumb-container .breadcrumb a'));
    const componentIndex = getComponentIndex(e.target.closest('.breadcrumb-container .breadcrumb a'));
    const nextPageURL = e.target.closest(".breadcrumb-container .breadcrumb a")?.getAttribute("href");
    breadcrumbItemClick(pageRegion, minifyText(secondaryLink?.textContent), nextPageURL, 'breadcrumb-click', 'internal', 'breadcrumb', 'in-content', breadcrumblevel, level, 'breadcrumb', 'breadcrumb', componentIndex, getPersona(), '', '', '', '', '');
  }
});
