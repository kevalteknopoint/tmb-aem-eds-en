import {
  ctaInteraction,
  menuInteraction,
  minifyText,
  socialmediaClick,
  getComponentIndex,
  getPersona,
} from "../../scripts/analytics/exports.js";

document.addEventListener("click", (e) => {
  if (e.target.closest(".footer-col")) {
    const anchor = e.target.closest("a");
    if (anchor) {
      const icon = anchor.querySelector(".icon");
      if (!icon) {
        const componentIndex = getComponentIndex(anchor);
        const nextPageURL = anchor.getAttribute("href") || "";
        const sectionEl = e.target.closest(".section");
        const componentId = sectionEl?.getAttribute("id") || "";
        const closestLi = anchor.closest("li");

        const footerCol = anchor.closest(".footer-col");
        const levelOneMenu = minifyText(
          footerCol?.querySelector("h1,h2,h3,h4,h5,h6")?.textContent
        );

        let text = "";
        if (closestLi) {
          closestLi.childNodes?.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              text += minifyText(node.textContent);
            }
          });
        }

        if (!text && closestLi?.querySelector(":scope > p")) {
          text = minifyText(
            closestLi.querySelector(":scope > p")?.textContent
          );
        }

        menuInteraction(
          "bottom",
          levelOneMenu,
          minifyText(anchor.textContent),
          "",
          "global footer",
          "footer",
          componentIndex,
          getPersona(),
          nextPageURL,
          "menu-click",
          "internal",
          "",
          "",
          "",
          componentId,
          ""
        );
      }
    }
  }

  // ✅ FIXED: Social media tracking (prevents CTA trigger)
  if (e.target.closest(".footer-social")) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const iconSpan = anchor.querySelector(".icon");
    if (!iconSpan) return;

    const classList = Array.from(iconSpan.classList);

    const iconClass = classList.find(
      (cls) => cls.startsWith("icon-") && cls !== "icon"
    );

    const iconName = iconClass?.replace("icon-", "");

    const componentIndex = getComponentIndex(anchor);

    socialmediaClick(
      "bottom",
      minifyText(iconName),
      "global footer",
      "footer",
      componentIndex,
      getPersona(),
      "socialmedia-click",
      "",
      "",
      "",
      "global footer",
      ""
    );

    return; // IMPORTANT: stops footer-contact CTA firing
  }

  if (e.target.closest(".footer-links")) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const iconSpan = anchor.querySelector(".icon");
    if (!iconSpan) return;

    const classList = Array.from(iconSpan.classList);
    const iconClass = classList.find(
      (cls) => cls.startsWith("icon-") && cls !== "icon"
    );
    const iconName = iconClass?.replace("icon-", "");

    const componentIndex = getComponentIndex(anchor);

    socialmediaClick(
      "bottom",
      minifyText(iconName),
      "global footer",
      "footer",
      componentIndex,
      getPersona(),
      "socialmedia-click",
      "",
      "",
      "",
      "global footer",
      ""
    );
  }

  if (e.target.closest(".footer-bottom")) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const anchorLi = anchor?.closest("li");
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute("href") || "";

    menuInteraction(
      "bottom",
      minifyText(anchorLi?.textContent),
      minifyText(anchor?.getAttribute("title")),
      "global footer",
      "footer",
      componentIndex,
      getPersona(),
      nextPageURL,
      "menu-click",
      "internal",
      "link",
      "footer",
      "",
      "",
      "",
      "global footer",
      ""
    );
  }

  if (e.target.closest(".footer-contact")) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const anchorLi = anchor?.closest("li");
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute("href") || "";

    ctaInteraction(
      "bottom",
      minifyText(anchorLi?.textContent),
      minifyText(anchor?.getAttribute("title")),
      "socialmedia-click",
      "global footer",
      "footer",
      componentIndex,
      getPersona(),
      nextPageURL,
      "cta-click",
      "internal",
      "link",
      "footer",
      "",
      "",
      "",
      "global footer",
      ""
    );
  }

  if (e.target.closest(".footer-meta-item")) {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const footerMetaItem = anchor.closest(".footer-meta-item");
    const heading = footerMetaItem?.querySelector("h1,h2,h3,h4,h5,h6");

    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor.getAttribute("href") || "";
    const sectionEl = e.target.closest(".section");
    const componentId = sectionEl?.getAttribute("id") || "";

    menuInteraction(
      "bottom",
      minifyText(heading?.textContent),
      minifyText(anchor.textContent),
      "",
      "global footer",
      "footer",
      componentIndex,
      getPersona(),
      nextPageURL,
      "menu-click",
      "internal",
      "",
      "",
      "",
      componentId,
      ""
    );
    ;
  }
});
