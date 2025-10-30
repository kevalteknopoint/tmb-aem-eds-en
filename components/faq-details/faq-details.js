// export default function decorateFaqDetail() {
//   const mainClass = document.querySelector("main");
//   const secwrapper = mainClass?.querySelector(".section-wrapper");

//   if (!secwrapper) return;

//   const subsecwrapper = mainClass.querySelectorAll(".sub-section-wrapper");
//   const addclsstoul = mainClass.querySelector(".right-section-wrapper ul");

//   if (addclsstoul) addclsstoul.classList.add("right-ul");
//   Array.from(subsecwrapper).forEach((e) => secwrapper.append(e));

//   document.querySelectorAll(".right-ul li").forEach((li) => {
//     const text = li.firstChild.textContent.trim();
//     const span = document.createElement("span");
//     span.textContent = text;
//     span.classList.add("faq-number");
//     li.firstChild.remove();
//     li.prepend(span);
//   });

//   const sections = mainClass.querySelectorAll(
//     ".sub-section-wrapper .default-content-wrapper h3[id]"
//   );
//   const navLinks = mainClass.querySelectorAll(".right-ul a");

//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();

//       const href = link.getAttribute("href");
//       const heading = document.querySelector(href);

//       if (!heading) return;

//       const sectionWrapper = heading.closest(".sub-section-wrapper");

//       const offset = 150;
//       const topPos =
//         sectionWrapper.getBoundingClientRect().top + window.scrollY - offset;

//       heading.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//       window.scrollTo({
//         top: topPos,
//         behavior: "smooth",
//       });
//     });
//   });

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (!entry.isIntersecting) return;

//         const { id } = entry.target;

//         navLinks.forEach((link) => link.classList.remove("active"));

//         const activeLink = document.querySelector(`.right-ul a[href="#${id}"]`);
//         if (activeLink) activeLink.classList.add("active");
//       });
//     },
//     {
//       threshold: 0.4,
//       rootMargin: "-100px 0px -40% 0px",
//     }
//   );

//   sections.forEach((section) => observer.observe(section));

//   document.addEventListener("scroll", () => {
//     const mainHeading = document.querySelector(".faq-heading-section h1");
//     const rightHeading = document.querySelector(".right-section-wrapper h2");

//     if (!mainHeading || !rightHeading) return;

//     if (window.scrollY > 100) {
//       mainHeading.style.display = "none";
//       rightHeading.style.display = "block";
//     } else {
//       mainHeading.style.display = "block";
//       rightHeading.style.display = "none";
//     }
//   });
// }

export default async function decorateFaqDetail() {
  const mainClass = document.querySelector("main");
  const secwrapper = mainClass?.querySelector(".section-wrapper");
  if (!secwrapper) return;

  const graphqlUrl =
    "https://publish-p162853-e1744823.adobeaemcloud.com/graphql/execute.json/tmb/faqDetailByPath;path=/content/dam/tmb/content-fragments/faqs/test-category/how-do-i-change-a-direct-debit-from-another-financial-institution-to-teachers-mutual-bank/how-do-i-change-a-direct-debit-from-another-financial-institution-to-teachers-mutual-bank";

  try {
    const res = await fetch(graphqlUrl);
    const data = await res.json();
    const faq = data?.data?.faqByPath?.item;
    console.log(data);
    if (!faq) return;

    // ===== Heading Section =====
    const headingSection = document.querySelector(".faq-heading-section");
    headingSection.innerHTML = "";

    const headingh1 = document.createElement("h1");
    headingh1.classList.add("faq-heading");
    headingh1.textContent = faq.question;
    headingSection.appendChild(headingh1);

    // ===== Sub Section Wrapper =====
    const subsectionAndRightSection = document.createElement("div");
    subsectionAndRightSection.classList.add(
      "sub-section-wrapper",
      "right-section-wrapper"
    );

    const headingh2 = document.createElement("h2");
    headingh2.textContent = faq.question;

    const rightsectionPtag = document.createElement("p");
    rightsectionPtag.textContent = "On this page:";

    const ul = document.createElement("ul");
    ul.classList.add("right-ul");

    // ===== Create list items =====
    faq.faqContentReference.forEach((lidata, i) => {
      // ====for right section ===
      const li = document.createElement("li");
      const link = document.createElement("a");
      const spanforcount = document.createElement("span");
      const subtitle = lidata.sectionTitle.toLowerCase().replace(/\s+/g, "-");
      link.href = `#${subtitle}`;
      spanforcount.textContent = `[${i + 1}]`;
      link.textContent = `${lidata.sectionTitle}`;
      li.appendChild(spanforcount);
      li.appendChild(link);
      ul.appendChild(li);

      const subsectionAndleftSection = document.createElement("div");
      subsectionAndleftSection.classList.add("sub-section-wrapper");
      const headingh3 = document.createElement("h3");
      headingh3.id = lidata.sectionTitle;
      headingh3.textContent = lidata.sectionTitle;

      const leftsectionPtag = document.createElement("p");
      leftsectionPtag.textContent = lidata.sectionContent.html;
      subsectionAndleftSection.appendChild(headingh3);
      subsectionAndleftSection.appendChild(leftsectionPtag);
      secwrapper.appendChild(subsectionAndleftSection);
    });

    // ===== Append all only ONCE =====
    subsectionAndRightSection.appendChild(headingh2);
    subsectionAndRightSection.appendChild(rightsectionPtag);
    subsectionAndRightSection.appendChild(ul);

    // ===== Wrap inside secwrapper =====
    secwrapper.appendChild(subsectionAndRightSection);
  } catch (err) {
    console.error("Error loading FAQ:", err);
  }

  const sections = document.querySelectorAll(".sub-section-wrapper h3[id]");
  const navLinks = document.querySelectorAll(".right-ul a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      const heading = mainClass.querySelector(href);

      if (!heading) return;

      const sectionWrapper = heading.closest(".sub-section-wrapper");

      const offset = 150;
      const topPos =
        sectionWrapper.getBoundingClientRect().top + window.scrollY - offset;

      heading.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const { id } = entry.target;

        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(`.right-ul a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-100px 0px -40% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}
