import { a, div, li, ul } from "../../scripts/dom-helpers.js";

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function hasCommonString(arr1, arr2) {
  const set1 = new Set(arr1);
  return arr2.some((item) => set1.has(item));
}

function getDeepWordCount(element) {
  if (!element) return 0;

  const text = element.innerText || "";

  const words = text.trim().split(/\s+/).filter((word) => word.length > 0);

  return words.length;
}

function calculateReadingTime(wordCount) {
  const wordsPerMinute = 200; // average reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

(function decorateLeftMenu() {
  if (window.location.origin.includes('author')) return;

  const mainEle = document.querySelector('main');
  const breadcrumb = document.querySelector('.section.breadcrumb-container');
  const leftMenu = document.querySelector('.evergreen-left-menu');
  const rightMenu = document.querySelector('.evergreen-right-sticky');
  const leftMenuUl = leftMenu.querySelector('ul') || ul();

  leftMenuUl.innerHTML = '';

  if (!leftMenu || !rightMenu) return;

  const allSections = document.querySelectorAll('main .section');
  const sectionClasses = ['mortage-insurance', 'lenders-mortgage-insurance', 'embed-iframe', 'customer-evergreen-variant', 'evergreen-image-swapping-variant', 'stepper-evergreen'];

  const contentWrapper = div({ class: 'evergreen-main-content' });

  allSections.forEach((section) => {
    if (hasCommonString(sectionClasses, Array.from(section.classList))) {
      contentWrapper.appendChild(section);
    }
  });

  const overallGridWrapper = div({ class: 'evergreen-grid-wrapper top-margin bottom-margin' }, leftMenu, contentWrapper, rightMenu);
  mainEle.insertAdjacentElement('afterbegin', overallGridWrapper);
  mainEle.insertAdjacentElement('afterbegin', breadcrumb);

  const wordCount = getDeepWordCount(contentWrapper);
  const readTime = calculateReadingTime(wordCount);
  const readTimeDiv = document.querySelector('.insurance-content-1 p');

  if (readTimeDiv) readTimeDiv.innerHTML += `<span class="word-separator"> - </span>${readTime} minute read`;

  const allHeadings = contentWrapper?.querySelectorAll('.lenders-mortgage-insurance h2, .lenders-mortgage-insurance h3');
  allHeadings.forEach((head) => {
    const slugId = slugify(head.textContent || '');
    head.id = slugId;
    leftMenuUl.appendChild(li({ class: 'left-menu-item' }, a({ class: 'left-menu-item-link', href: `#${slugId}` }, head.textContent)));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const { id } = entry.target;
        leftMenuUl?.querySelectorAll('li')?.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`a[href="#${id}"].left-menu-item-link`)?.parentElement;
        if (active) active.classList.add("active");
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-141px 0px -40% 0px",
    }
  );

  allHeadings.forEach((head) => observer.observe(head));
}());
