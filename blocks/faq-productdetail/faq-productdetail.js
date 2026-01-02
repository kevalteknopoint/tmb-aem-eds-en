import { div, h2, p } from "../../scripts/dom-helpers.js";
import { fetchPlaceholders } from "../../scripts/placeholders.js";

/* ---------- ACCORDION ITEM ---------- */
function createAccordionItem(question, answerHtml) {
  const details = document.createElement("details");
  details.className = "accordion-item";

  const summary = document.createElement("summary");
  summary.className = "accordion-item-label";

  summary.append(
    p(question),
    document.createRange().createContextualFragment(`
      <svg class="icon">
        <use href="#chevron-up-round"></use>
      </svg>
    `)
  );

  const body = div({ class: "accordion-item-body" });
  body.append(
    document.createRange().createContextualFragment(answerHtml || "")
  );

  details.append(summary, body);
  return details;
}

/* ---------- RENDER FAQ ---------- */
function renderFAQ(block, faq) {
  const section = block.closest(".faq-productdetail-container");
  block.textContent = "";

  /* LEFT SIDE */
  const leftCol = div(
    { class: "faq-left" },
    h2("FREQUENTLY ASKED QUESTIONS")
  );

  /* Normalize data → always array */
  const faqItems = Array.isArray(faq)
    ? faq
    : [faq];

  /* RIGHT SIDE (MATCHES YOUR HTML) */
  const accordion = div(
    {
      class: "accordion single-expansion block",
      "data-block-name": "accordion",
      "data-block-status": "loaded",
    },
    ...faqItems.map((item) =>
      createAccordionItem(
        item.question,
        item.shortDescription?.html
      )
    )
  );

  const rightCol = div(
    { class: "faq-right" },
    div({ class: "accordion-wrapper" }, accordion)
  );

  block.append(
    div({ class: "faq-layout" }, leftCol, rightCol)
  );

  if (section) {
    section.style.display = "";
    section.dataset.sectionStatus = "loaded";
  }
}

/* ---------- DECORATE ---------- */
export default async function decorate(block) {
  const secwrapper = document.querySelector(".faq-productdetail-wrapper");
  if (!secwrapper) return;

  const placeholders = await fetchPlaceholders();
  const graphqlUrl = `${placeholders.graphqlurl}faqShortContent;path=`;

  try {
    const fragUrl = block.querySelector("a")?.getAttribute("href");
    if (!fragUrl) return;

    const res = await fetch(`${graphqlUrl}${fragUrl}`);
    const data = await res.json();
    const faq = data?.data?.faqByPath?.item;

    if (!faq) return;

    console.log("FAQ DATA:", faq);
    renderFAQ(block, faq);
  } catch (err) {
    console.error("Error loading FAQ:", err);
  }
}
