import { isMobile } from "../../scripts/aem.js";
import './product-navigation-analytics.js';

function fixCtaLinks() {
  document.querySelectorAll('a[href*="ast.tmbank.com.au"]').forEach((link) => {
    const raw = link.getAttribute('href');
    if (!raw || !/[?&]encp=/.test(raw)) return;

    const fixed = raw.replace(/([?&]encp=)([^&#]*)/, (_, prefix, val) => {
      // Fully decode any (possibly multi-level) percent-encoding, then
      // re-encode only the characters that are unsafe inside a query value.
      let v = val;
      try {
        let prev;
        do {
          prev = v;
          v = decodeURIComponent(v);
        } while (v !== prev);
      } catch (e) {
        // value contained a stray % that isn't valid encoding; use as-is
      }

      const reEncoded = v
        .replace(/%/g, '%25')
        .replace(/\+/g, '%2B')
        .replace(/\//g, '%2F')
        .replace(/=/g, '%3D');

      return prefix + reEncoded;
    });

    if (fixed !== raw) link.setAttribute('href', fixed);
  });
}

function runCtaFix() {
  fixCtaLinks();
}

requestAnimationFrame(runCtaFix);
setTimeout(runCtaFix, 500);

function isElementInView(container, element, percentVisible = 1) {
  const containerRect = container.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();

  const visibleWidth = Math.min(elemRect.right, containerRect.right) - Math.max(elemRect.left, containerRect.left);

  const elementWidth = elemRect.width;

  if (visibleWidth <= 0) return false;

  const visiblePercent = (visibleWidth / elementWidth) * 100;

  return visiblePercent >= percentVisible;
}

(function decorateProductNavigation() {
  const productNav = document.querySelector(".product-navigation");

  if (productNav.dataset.initialized) return;
  productNav.dataset.initialized = 'true';

  const scrollWrapper = productNav?.querySelector(".default-content-wrapper");
  const scrollContainer = productNav?.querySelector(".default-content-wrapper ul");

  if (!productNav || window.location.href?.includes('author')) return;

  // eslint-disable-next-line
  const offsetSub = isMobile() ? 60 : 90;
  const threshold = isMobile() ? 0.3 : 0.4;

  const allLinks = productNav?.querySelectorAll("ul a");
  const allContainers = Array.from(allLinks).map((link) => {
    if (!link.getAttribute("href").startsWith("#")) return document.createElement("div");

    const linkedContainer = document.querySelector(
      `${link.getAttribute("href")}-scroll`
    );

    link.addEventListener("click", () => {
      if (!isElementInView(scrollWrapper, link, 105)) {
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
          if (!isElementInView(scrollWrapper, entryLink, 105)) {
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
      threshold,
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
}());
