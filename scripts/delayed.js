if (window.location.href.includes("/faq-detail")) {
  const mainClass = document.querySelector("main");
  console.log(mainClass);
  const secwrapper = mainClass.querySelector(".section-wrapper");
  const subsecwrapper = mainClass.querySelectorAll(".sub-section-wrapper");
  const addclsstoul = mainClass.querySelector(".right-section-wrapper ul");
  addclsstoul.classList.add("right-ul");
  Array.from(subsecwrapper).forEach((e) => {
    secwrapper.append(e);
  });

  ///////
  const sections = mainClass.querySelectorAll(".sub-section-wrapper .default-content-wrapper h3[id]");
  const navLinks = mainClass.querySelectorAll(".right-ul a");

  const observer = new IntersectionObserver(

    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const { id } = entry.target;

        // Remove previous active
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active to matching based on href
        const activeLink = mainClass.querySelector(`.right-ul a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-80px 0px -50% 0px"

    }
  );

  sections.forEach((section) => observer.observe(section));
}
