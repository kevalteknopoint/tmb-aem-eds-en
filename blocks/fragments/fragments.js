import { div, h3, h4, h5, p, a, span } from "../../scripts/dom-helpers.js";
import { decorateMain } from "../../scripts/scripts.js";
import { loadSections } from "../../scripts/aem.js";
import { fetchPlaceholders } from "../../scripts/placeholders.js";

/**
 * Renders all collected rows into the exact nested HTML structure requested.
 */
async function renderAllCards(block, allRows) {
  const cardsContainer = div({ class: "compare-accounts-cards" });

  // Fetch placeholders once outside the loop for better performance
  const placeholders = await fetchPlaceholders();

  // eslint-disable-next-line
  for (const row of allRows) {
    let cardData = {};

    // 1. DATA EXTRACTION (Remains as you had it)
    if (row.classList.contains("compare-accounts-wrapper")) {
      const existingCard = row.querySelector(".compare-accounts-card");
      if (existingCard) {
        cardData = {
          isActive: existingCard.classList.contains("active"),
          title:
            existingCard.querySelector(".product-title")?.textContent.trim() || "",
          description:
            existingCard
              .querySelector(".product-description")
              ?.textContent.trim() || "",
          pretitle:
            existingCard
              .querySelector(".product-interest-pretitle")
              ?.textContent.trim() || "",
          rawRate:
            existingCard
              .querySelector(".product-interest-rate")
              ?.textContent.trim() || "",
          disclaimer:
            existingCard
              .querySelector(".product-disclaimer")
              ?.textContent.trim() || "",
          btnText:
            existingCard.querySelector(".button")?.textContent.trim() || "Apply Now",
          btnLink:
            existingCard.querySelector(".button")?.getAttribute("href") || "#",
          btnTitle:
            existingCard.querySelector(".button")?.getAttribute("title") || "",
          btnTarget:
            existingCard.querySelector(".button")?.getAttribute("target") || "_self",
          btnStyle:
            [...(existingCard.querySelector(".button")?.classList || [])].find(
              (c) => c !== "button",
            ) || "outlined",
        };
      }
    } else {
      const cells = Array.from(row.children);
      // eslint-disable-next-line
      if (cells.length < 2) continue;
      cardData = {
        isActive: cells[0]?.textContent.trim().toLowerCase() === "true",
        title: cells[1]?.textContent.trim() || "",
        description: cells[2]?.textContent.trim() || "",
        pretitle: cells[3]?.textContent.trim() || "",
        rawRate: cells[4]?.textContent.trim() || "",
        rateElement: cells[4],
        disclaimer: cells[5]?.textContent.trim() || "",
        btnText: cells[6]?.textContent.trim() || "Apply Now",
        btnLink: cells[8]?.textContent.trim() || "#",
        btnTitle: cells[7]?.textContent.trim() || "",
        btnTarget: cells[9]?.textContent.trim() || "_self",
        btnStyle: cells[10]?.textContent.trim() || "button",
      };
    }

    // 2. CORRECTED PLACEHOLDER RESOLUTION
    const placeholderKey = cardData.rawRate.replace(/~/g, "").trim();
    const resolvedRate = placeholders[placeholderKey] || cardData.rawRate;

    let rateContent;
    if (resolvedRate && resolvedRate.includes("%")) {
      const num = resolvedRate.split("%")[0].trim();
      rateContent = span(
        { class: "interest-rate" },
        span({ class: "rate-num" }, num),
        span(
          { class: "rate-unit" },
          span({ class: "rate-percent" }, "%"),
          span({ class: "rate-pa" }, "p.a."),
        ),
      );
    } else {
      rateContent = cardData.rateElement?.querySelector("*") || resolvedRate;
    }

    // 3. CARD CONSTRUCTION
    if (cardData.title || cardData.description) {
      const card = div(
        {
          class: [
            "compare-accounts-card",
            cardData.isActive && "active",
          ].filter(Boolean),
        },
        h3({ class: "product-title" }, cardData.title),
        h4({ class: "product-description" }, cardData.description),
        h5({ class: "product-interest-pretitle" }, cardData.pretitle),
        p({ class: "product-interest-rate" }, p(rateContent)),
        p({ class: "product-disclaimer" }, cardData.disclaimer),
        p(
          { class: "button-container" },
          a(
            {
              href: cardData.btnLink,
              title: cardData.btnTitle,
              target: cardData.btnTarget,
              class: ["button", cardData.btnStyle].filter(Boolean),
            },
            cardData.btnText,
          ),
        ),
      );
      cardsContainer.appendChild(card);
    }
  }

  const innerBlock = div(
    { class: "compare-accounts block", "data-block-name": "compare-accounts" },
    cardsContainer,
  );
  const outerWrapper = div({ class: "compare-accounts-wrapper" }, innerBlock);
  block.replaceChildren(outerWrapper);
}

export async function loadFragment(path) {
  if (path && path.startsWith("/")) {
    const urlPath = path.replace(/(\.plain)?\.html/, "");
    const resp = await fetch(`${urlPath}.plain.html`);
    if (resp.ok) {
      const main = document.createElement("main");
      main.innerHTML = await resp.text();
      await decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  if (window.location.href.includes("author")) return;
  const links = [...block.querySelectorAll("a")];
  const allRows = [];
  block.innerHTML = "";

  // eslint-disable-next-line
  for (const link of links) {
    const path = link.getAttribute("href") || link.textContent.trim();

    // eslint-disable-next-line
    const fragment = await loadFragment(path);
    if (fragment) {
      const fragmentBlock = fragment.querySelector(".compare-accounts");
      if (fragmentBlock) {
        const wrapper = fragmentBlock.querySelector(
          ".compare-accounts-wrapper",
        );
        if (wrapper) {
          allRows.push(wrapper);
        } else {
          [...fragmentBlock.children].forEach((row) => {
            if (row.children.length > 0) allRows.push(row);
          });
        }
      }
    }
  }

  if (allRows.length > 0) {
    await renderAllCards(block, allRows);
  }
}
