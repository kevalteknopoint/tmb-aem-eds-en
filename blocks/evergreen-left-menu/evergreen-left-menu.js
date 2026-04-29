import { a, div, li, ul } from "../../scripts/dom-helpers.js";

// function createRootMarginOverlay(rootMargin) {
//   const margins = rootMargin.split(" ").map((v) => parseInt(v, 10));

//   const overlay = document.createElement("div");
//   overlay.style.position = "fixed";
//   overlay.style.pointerEvents = "none";
//   overlay.style.border = "2px dashed red";
//   overlay.style.zIndex = "9999";
//   overlay.style.width = `99%`;
//   overlay.style.margin = '0 auto';

//   overlay.style.top = `${margins[0]}px`;
//   overlay.style.right = `${margins[1]}px`;
//   overlay.style.bottom = `${margins[2]}px`;
//   overlay.style.left = `${margins[3]}px`;

//   document.body.appendChild(overlay);
// }

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

  if (!leftMenu) return;

  if (leftMenu.dataset.initialized) return;
  leftMenu.dataset.initialized = 'true';

  let leftMenuUl = leftMenu.querySelector('ul');

  if (!leftMenuUl) leftMenuUl = ul();

  leftMenu?.querySelector('.default-content-wrapper')?.appendChild(leftMenuUl);

  leftMenuUl.innerHTML = '';

  const allSections = document.querySelectorAll('main .section');
  const sectionClasses = ['mortage-insurance', 'lenders-mortgage-insurance', 'embed-iframe', 'customer-evergreen-variant', 'evergreen-image-swapping-variant', 'stepper-evergreen'];

  const contentWrapper = div({ class: 'evergreen-main-content' });

  allSections.forEach((section) => {
    if (hasCommonString(sectionClasses, Array.from(section.classList))) {
      contentWrapper.appendChild(section);
    }
  });

  const overallGridWrapper = div({ class: 'evergreen-grid-wrapper top-margin bottom-margin' }, leftMenu, contentWrapper);
  if (rightMenu) overallGridWrapper?.appendChild(rightMenu);
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
    const headLink = a({ class: 'left-menu-item-link', href: `#${slugId}` }, head.textContent);
    leftMenuUl.appendChild(li({ class: 'left-menu-item' }, headLink));

    headLink.addEventListener('click', (e) => {
      e.preventDefault();

      const linkedHeading = document.querySelector(`.evergreen-main-content h2#${slugId}, .evergreen-main-content h3#${slugId}`);
      window.scrollTo({
        top: linkedHeading.offsetTop - 200,
        behavior: 'smooth'
      });
    });
  });

  // Scroll-based active highlighting.
  // The click handler scrolls headings to `offset` px from the top of the viewport,
  // so use the same offset (plus a small buffer) to decide which heading is "current".
  const ACTIVE_OFFSET = 340;
  const headingsArr = Array.from(allHeadings);

  const setActive = (id) => {
    leftMenuUl?.querySelectorAll('li')?.forEach((link) => link.classList.remove('active'));
    if (!id) return;
    const active = leftMenuUl?.querySelector(`a[href="#${id}"].left-menu-item-link`)?.parentElement;
    if (active) active.classList.add('active');
  };

  const updateActiveHeading = () => {
    if (!headingsArr.length) return;

    // Threshold line: a heading is considered "passed" once its top crosses this Y.
    // Add a small buffer so the next heading activates slightly before reaching exact offset.
    const threshold = ACTIVE_OFFSET + 1;

    let currentId = '';
    for (let i = 0; i < headingsArr.length; i += 1) {
      const rect = headingsArr[i].getBoundingClientRect();
      if (rect.top <= threshold) {
        currentId = headingsArr[i].id;
      } else {
        break;
      }
    }

    // If we're scrolled to the very bottom of the page, force-activate the last heading
    // (covers the case where the last section is shorter than the viewport offset).
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (scrolledToBottom) {
      currentId = headingsArr[headingsArr.length - 1].id;
    }

    // If nothing has been passed yet (above first heading), default to the first one
    // once the content area is in view; otherwise clear.
    if (!currentId) {
      const firstRect = headingsArr[0].getBoundingClientRect();
      if (firstRect.top < window.innerHeight) {
        currentId = headingsArr[0].id;
      }
    }

    setActive(currentId);
  };

  let scrollScheduled = false;
  const onScrollOrResize = () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(() => {
      scrollScheduled = false;
      updateActiveHeading();
    });
  };

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  updateActiveHeading();
}());
