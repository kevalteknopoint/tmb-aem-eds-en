import {
  bannerInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
} from "../../scripts/analytics/exports.js";

document.addEventListener("click", (e) => {
  if (e.target.closest(".bannervideo-wrapper .button")) {
    const secondaryLink = e.target.closest(".bannervideo-wrapper .button");
    const bannerName = e.target
      .closest(".bannervideo-wrapper")
      .querySelector("h1,h2,h3,h4,h5,h6")
      ?.getAttribute("id");
    const button = e.target.closest(".bannervideo-wrapper .button");
    const pageRegion = getPageRegion(button);
    const componentIndex = getComponentIndex(button);
    const nextPageURL = e.target
      .closest(".bannervideo-wrapper .button")
      ?.getAttribute("href");
    const carouselPosition = e.target
      .closest(".bannervideo-wrapper .button")
      .closest(".swiper-slide")
      .getAttribute("aria-label")
      .split(" / ")[0];
    bannerInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      bannerName,
      carouselPosition,
      "bannervideo",
      "bannervideo",
      componentIndex,
      getPersona(),
      nextPageURL,
      "banner-click",
      "internal",
      "",
      "",
      "",
      "homepage-banner",
      "",
      "",
    );
  }
  if (e.target.closest(".bannervideo-wrapper .swiper-pagination-bullet")) {
    const secondaryLink = e.target.closest(
      ".bannervideo-wrapper .swiper-pagination-bullet",
    );
    const carouselPosition = secondaryLink
      .getAttribute("aria-label")
      .replaceAll(/\D+/g, "");
    bannerInteraction(
      "",
      minifyText(secondaryLink?.textContent),
      bannerName,
      carouselPosition,
      "",
      "",
      "",
      "",
      "",
      "",
      "banner-click",
      "internal",
      "",
      "",
      "",
      "",
      "",
    );
  }
});
