import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener("click", (e) => {
  const arrowBtn = e.target.closest(".expandable-tiles-section .cta-link.icon-btn");

  if (!arrowBtn) return;

  const tile = arrowBtn.closest(".expandable-tile");
  if (!tile) return;

  const section = arrowBtn.closest(".section");

  const pageRegion = getPageRegion(arrowBtn);
  const componentIndex = getComponentIndex(tile);

  const heading = tile.querySelector(".content-title")?.textContent || "";

  const description = tile.querySelector(".content-description")?.textContent || "";

  const nextPageURL = arrowBtn.closest("a")?.getAttribute("href") || "";

  ctaInteraction(
    pageRegion,
    minifyText(heading), // CTA text
    minifyText(description), // CTA title / context
    "expandable-tiles", // CTA source
    "expandable-tile", // component name
    "cards", // component type
    componentIndex,
    getPersona(),
    nextPageURL,
    "cta-click", // interaction type
    "internal",
    "in-content",
    "icon-click", // click type (arrow)
    "",
    "",
    "",
    section?.id || "",
    "",
    "",
    ""
  );
});
