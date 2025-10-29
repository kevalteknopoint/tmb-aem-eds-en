export default function decorateFaqDetail() {
  const mainClass = document.querySelector("main");
  const secwrapper = mainClass?.querySelector(".section-wrapper");

  if (!secwrapper) return;

  const subsecwrapper = mainClass.querySelectorAll(".sub-section-wrapper");
  const addclsstoul = mainClass.querySelector(".right-section-wrapper ul");

  if (addclsstoul) addclsstoul.classList.add("right-ul");
  Array.from(subsecwrapper).forEach((e) => secwrapper.append(e));

  document.querySelectorAll(".right-ul li").forEach((li) => {
    const text = li.firstChild.textContent.trim();
    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("faq-number");
    li.firstChild.remove();
    li.prepend(span);
  });

  const sections = mainClass.querySelectorAll(
    ".sub-section-wrapper .default-content-wrapper h3[id]"
  );
  const navLinks = mainClass.querySelectorAll(".right-ul a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      const heading = document.querySelector(href);

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

  document.addEventListener("scroll", () => {
    const mainHeading = document.querySelector(".faq-heading-section h1");
    const rightHeading = document.querySelector(".right-section-wrapper h2");

    if (!mainHeading || !rightHeading) return;

    if (window.scrollY > 100) {
      mainHeading.style.display = "none";
      rightHeading.style.display = "block";
    } else {
      mainHeading.style.display = "block";
      rightHeading.style.display = "none";
    }
  });
}
