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
  /* Normalize data → always array */
  const faqItems = Array.isArray(faq)
    ? faq
    : [faq];

  block.append(...faqItems.map((item) =>
    createAccordionItem(
      item.question,
      item.shortDescription?.html
    )
  ));
}

/* ---------- DECORATE ---------- */
export default async function decorate(block) {
  const secwrapper = document.querySelector(".faq-product-detail-wrapper");

  if (!secwrapper) return;

  const placeholders = await fetchPlaceholders();
  const graphqlUrl = `${placeholders.graphqlurl}faqShortContent;path=`;

  try {
    const newBlock = div({ class: 'accordion-wrapper' });
    const accordion = div(
      {
        class: "accordion single-expansion block",
        "data-block-name": "accordion",
        "data-block-status": "loaded",
      },
    );

    for (const item of [...block.children]) {
      const fragUrl = item.querySelector("a")?.getAttribute("href");
      if (!fragUrl) return;
  
      const res = await fetch(`${graphqlUrl}${fragUrl}`);
      const data = await res.json();
      const faq = data?.data?.faqByPath?.item;
  
      if (!faq) return;
  
      renderFAQ(accordion, faq);
    }

    block.innerHTML = '';
    newBlock.appendChild(accordion);
    block.appendChild(newBlock);
  } catch (err) {
    console.error("Error loading FAQ:", err);
  }
}
