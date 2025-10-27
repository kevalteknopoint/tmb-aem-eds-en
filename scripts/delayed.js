if (window.location.href.includes("/faq-detail")) {
  const mainClass = document.querySelector("main");

  const secwrapper = mainClass.querySelector(".section-wrapper");
  const subsecwrapper = mainClass.querySelectorAll(".sub-section-wrapper");
  const addclsstoul = mainClass.querySelector(".right-section-wrapper ul");

  if (addclsstoul) addclsstoul.classList.add("right-ul");

  Array.from(subsecwrapper).forEach((e) => secwrapper.append(e));

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

      const offset = 140;
      const topPos = sectionWrapper.getBoundingClientRect().top + window.scrollY - offset;

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
      rootMargin: "-100px 0px -50% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}
