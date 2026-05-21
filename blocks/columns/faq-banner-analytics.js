import {
  bannerSearch,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener("input", (e) => {
  const input = e.target;

  if (!input || input.id !== "faq-search") return;

  const component = input.closest(".faq-landing-banner");
  if (!component) return;

  const pageRegion = getPageRegion(component);
  const componentIndex = getComponentIndex(component);

  const searchTerm = input.value.trim();
  if (searchTerm.length < 3) return;

  const sectionId = component.closest(".section")?.id || "";

  // TODO: replace with real API/UI result count if available
  const resultCount = document.querySelectorAll(".search-result-item")?.length || 0;

  // bucket logic - avoid nested ternary
  let searchResultCountBucket;
  if (resultCount === 0) {
    searchResultCountBucket = "0";
  } else if (resultCount <= 5) {
    searchResultCountBucket = "1-5";
  } else if (resultCount <= 10) {
    searchResultCountBucket = "6-10";
  } else {
    searchResultCountBucket = "10+";
  }

  bannerSearch(
    pageRegion,
    "help-search",
    searchTerm,
    "",
    searchResultCountBucket,
    "",
    "faq-landing-banner",
    "search-input",
    componentIndex,
    getPersona(),
    "banner-click",
    "",
    "",
    "",
    sectionId,
    ""
  );
});
