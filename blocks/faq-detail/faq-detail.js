import {
  div, h1, h2, h3, p, a, ul, li,
  // span,
  img,
} from '../../scripts/dom-helpers.js';
import { fetchPlaceholders } from '../../scripts/placeholders.js';

export default async function decorate(block) {
  if (window.location.origin.includes("author")) return;

  const secwrapper = document?.querySelector(".section-wrapper");
  if (!secwrapper) return;

  const placeholders = await fetchPlaceholders();

  const graphqlUrl = `${placeholders.graphqlUrl}faqDetailByPath;path=`;

  try {
    const fragUrl = block?.querySelector("a")?.getAttribute("href");
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

    let rightSection = false;

    // ========== Build Sections + Right Nav ==========
    // let numCount = 0;
    faq.faqContentReference.forEach((content) => {
      const id = content.sectionTitle?.toLowerCase().replace(/\s+/g, "-");

      if (content.sectionTitle) {
        rightSection = true;
        // numCount += 1;
        ulEl.append(
          li(
            // span(`[${numCount}]`),
            a({ href: `#${id}` }, content.sectionTitle),
          )
        );
      }

      function htmlToElement(htmlString) {
        if (!htmlString) return [document.createElement('div')];
        const template = document.createElement('template');
        template.innerHTML = htmlString?.trim();
        return Array.from(template.content.children);
      }

      const htmlElements = htmlToElement(content.sectionContent?.html);

      const subSection = div(
        { class: "sub-section-wrapper" },
        content.sectionTitle ? h3({ id }, content.sectionTitle) : '',
        ...htmlElements || '',
        (content.sectionImages && content.sectionImages.length > 0) ? div(
          { class: `img-${content.sectionImages.length}-grid` },
          ...content.sectionImages.map((imgData) =>
            img({
              src: imgData._publishUrl,
              alt: content.sectionTitle || "FAQ Image",
              loading: "lazy",
            })
          )
        ) : ''
      );

      if (content.sectionVideo && content.sectionVideo.plaintext) {
        subSection.insertAdjacentHTML('beforeend', content.sectionVideo.plaintext);
      }

      // Left content section
      secwrapper.append(
        subSection
      );
    });

    // Append right nav
    if (rightSection) {
      secwrapper?.querySelector('.faq-detail-wrapper')?.replaceWith(subsectionAndRightSection);
    } else {
      secwrapper?.querySelector('.faq-detail-wrapper')?.remove();
    }

    setTimeout(() => {
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
        { threshold: 0, rootMargin: "-40px 0px 0px 0px" }
      );

      headingObserver.observe(mainHeading);
    });
  } catch (err) {
    console.error("Error loading FAQ:", err);
  }
}
