import {
  bannerInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener("click", (e) => {
  const button = e.target.closest(".bannervideo-wrapper .button");
  if (!button) return;

  const isNewsHelpful = button.closest(".news-helpful");

  const componentType = isNewsHelpful
    ? "news-helpful"
    : "bannervideo";

  const componentName = componentType;

  const section = button.closest(".section");

  // banner heading (for text)
  const heading = section?.querySelector("h1,h2,h3,h4,h5,h6");

  const bannerName = heading?.textContent?.trim() || "";

  // ✅ FIXED: componentId should come ONLY from section id
  const componentId = section?.id || "";

  const pageRegion = getPageRegion(button);
  const componentIndex = getComponentIndex(button);

  const nextPageURL = button?.getAttribute("href");

  const carouselPosition = button
    .closest(".swiper-slide")
    ?.getAttribute("aria-label")
    ?.split(" / ")[0] || "";

  if (isNewsHelpful) return;

  bannerInteraction(
    pageRegion,
    minifyText(button?.textContent),
    minifyText(bannerName),
    carouselPosition,
    componentType,
    componentName,
    componentIndex,
    getPersona(),
    nextPageURL,
    "banner-click",
    "internal",
    "",
    "",
    "",
    componentId, // "" if not authored
    "",
  );
});
