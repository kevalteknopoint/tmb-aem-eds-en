import {
  div, h1, h2, h3, p, a, ul, li, span,
} from '../../scripts/dom-helpers.js';

export default async function decorateFaqDetail() {
  const secwrapper = document?.querySelector(".section-wrapper");
  if (!secwrapper) return;

  const graphqlUrl = "https://publish-p162853-e1744823.adobeaemcloud.com/graphql/execute.json/tmb/faqDetailByPath;path=";

  try {
    const defaultContentWrapper = secwrapper.querySelector('.default-content-wrapper');
    const fragUrl = defaultContentWrapper?.querySelector("a")?.getAttribute("href");
    if (!fragUrl) return;

    const res = await fetch(`${graphqlUrl}${fragUrl}`);
    const data = await res.json();
    const faq = data?.data?.faqByPath?.item;
    if (!faq) return;

    // ========== Heading Section ==========
    const headingSection = div({ class: 'section faq-heading-section' }, h1({ class: "faq-heading" }, faq.question));
    secwrapper.insertAdjacentElement('beforebegin', headingSection);

    // Container for right nav
    const subsectionAndRightSection = div(
      { class: "sub-section-wrapper right-section-wrapper" },
      h2(faq.question),
      p("On this page:"),
      ul({ class: "right-ul" })
    );
    const ulEl = subsectionAndRightSection.querySelector("ul");

    // ========== Build Sections + Right Nav ==========
    faq.faqContentReference.forEach((content, i) => {
      const id = content.sectionTitle.toLowerCase().replace(/\s+/g, "-");

      // Right nav item
      ulEl.append(
        li(
          span(`[${i + 1}]`),
          a({ href: `#${id}` }, content.sectionTitle),
        )
      );

      const paraEle = p();
      paraEle.innerHTML = content.sectionContent.plaintext?.replaceAll("\n", "<br>");

      // Left content section
      secwrapper.append(
        div(
          { class: "sub-section-wrapper" },
          h3({ id }, content.sectionTitle),
          paraEle
        )
      );
    });

    // Append right nav
    defaultContentWrapper?.replaceWith(subsectionAndRightSection);
  } catch (err) {
    console.error("Error loading FAQ:", err);
  }

  // ========== Smooth Scroll ==========
  const navLinks = document.querySelectorAll(".right-ul a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const heading = document.querySelector(href);
      if (!heading) return;

      const offset = 175;
      const topPos = heading.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: topPos, behavior: "smooth" });
    });
  });

  // ========== Active Link Scroll Observer ==========
  const sections = document.querySelectorAll(".sub-section-wrapper h3[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const { id } = entry.target;
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.right-ul a[href="#${id}"]`);
        if (active) active.classList.add("active");
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-141px 0px -40% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  // ========== Sticky Heading Switch ==========
  const mainHeading = document.querySelector(".faq-heading-section h1");
  const rightHeading = document.querySelector(".right-section-wrapper h2");
  if (!rightHeading) return;

  const headingHeight = rightHeading.offsetHeight;
  rightHeading.style.height = 0;

  const headingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rightHeading.classList.add("hide-heading");
          rightHeading.style.height = `0px`;
        } else {
          rightHeading.classList.remove("hide-heading");
          rightHeading.style.height = `${headingHeight}px`;
        }
      });
    },
    { threshold: 0, rootMargin: "-190px 0px 0px 0px" }
  );

  headingObserver.observe(mainHeading);
}
