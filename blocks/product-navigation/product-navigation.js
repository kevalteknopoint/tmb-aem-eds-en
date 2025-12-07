import { isMobile, isTablet } from "../../scripts/aem.js";

function isElementInView(container, element, percentVisible = 1) {
  const containerRect = container.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();

  const visibleWidth = Math.min(elemRect.right, containerRect.right) - Math.max(elemRect.left, containerRect.left);

  const elementWidth = elemRect.width;

  if (visibleWidth <= 0) return false;

  const visiblePercent = (visibleWidth / elementWidth) * 100;

  return visiblePercent >= percentVisible;
}

export default function decorateProductNavigation() {
  const productNav = document.querySelector(".product-navigation");
  const scrollWrapper = productNav?.querySelector(".default-content-wrapper");
  const scrollContainer = productNav?.querySelector(".default-content-wrapper ul");

  if (!productNav) return;

  // eslint-disable-next-line
  const offsetSub = isMobile() ? 60 : isTablet() ? 90 : 95;

  const allLinks = productNav?.querySelectorAll("ul a");
  const allContainers = Array.from(allLinks).map((link) => {
    if (!link.getAttribute("href").startsWith("#")) return document.createElement("div");

    const linkedContainer = document.querySelector(
      `${link.getAttribute("href")}-scroll`
    );

    link.addEventListener("click", () => {
      if (!isElementInView(scrollWrapper, link, 100)) {
        link.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }

      window.scrollTo({
        top: linkedContainer.offsetTop - offsetSub,
        behavior: "smooth",
      });
    });

    return linkedContainer || document.createElement("div");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allLinks.forEach((link) => link.classList.remove("active"));

          const entryId = entry.target
            .getAttribute("id")
            ?.replace("-scroll", "");

          if (!entryId) return;

          const entryLink = document.querySelector(`a[href="#${entryId}"]`);

          entryLink?.classList.add("active");
          if (!isElementInView(scrollWrapper, entryLink, 100)) {
            entryLink.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest"
            });
          }
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "0px 0px -20% 0px",
    }
  );

  allContainers.forEach((con) => observer.observe(con));

  const linkedContainer = document.querySelector(
    `${window.location.hash}-scroll`
  );

  if (linkedContainer) {
    window.scrollTo({
      top: linkedContainer.offsetTop - offsetSub,
      behavior: "smooth",
    });
  }

  function toggleFade() {
    const isOverflowing = scrollContainer.scrollWidth > scrollContainer.clientWidth;

    if (!isOverflowing) {
      scrollWrapper.classList.remove('show-fade');
      return;
    }

    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const currentScroll = scrollContainer.scrollLeft;

    const scrollTolerance = 5;

    const isAtEnd = currentScroll >= maxScrollLeft - scrollTolerance;

    if (isAtEnd) {
      scrollContainer.classList.remove('show-fade');
    } else {
      scrollContainer.classList.add('show-fade');
    }
  }

  toggleFade();

  scrollContainer.addEventListener("scroll", toggleFade);
}
