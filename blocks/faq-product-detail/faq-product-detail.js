import { div, p } from "../../scripts/dom-helpers.js";
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
    `),
  );

  const body = div({ class: "accordion-item-body" });
  body.append(
    document.createRange().createContextualFragment(answerHtml || ""),
  );

  details.append(summary, body);
  return details;
}

/* ---------- RENDER FAQ ---------- */
function renderFAQ(block, faq) {
  const faqItems = Array.isArray(faq) ? faq : [faq];

  block.append(
    ...faqItems.map((item) =>
      createAccordionItem(
        item.question,
        item.shortDescription?.html,
      ),
    ),
  );
}

/* ---------- DECORATE ---------- */
export default async function decorate(block) {
  const secwrapper = document.querySelector(".faq-product-detail-wrapper");
  if (!secwrapper) return;

  try {
    const placeholders = await fetchPlaceholders();
    const graphqlUrl = `${placeholders.graphqlurl}faqShortContent;path=`;

    const newBlock = div({ class: "accordion-wrapper" });
    const accordion = div({
      class: "accordion single-expansion block",
      "data-block-name": "accordion",
      "data-block-status": "loaded",
    });

    const blockItems = Array.from(block.children);

    const fetchPromises = blockItems
      .map((item) => item.querySelector("a")?.getAttribute("href"))
      .filter(Boolean)
      .map((fragUrl) =>
        fetch(`${graphqlUrl}${fragUrl}`)
          .then((res) => res.json())
          .then((data) => data?.data?.faqByPath?.item),
      );

    const faqs = await Promise.all(fetchPromises);

    faqs.filter(Boolean).forEach((faq) => {
      renderFAQ(accordion, faq);
    });

    block.innerHTML = "";
    newBlock.appendChild(accordion);
    block.appendChild(newBlock);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error loading FAQ:", err);
  }
}
