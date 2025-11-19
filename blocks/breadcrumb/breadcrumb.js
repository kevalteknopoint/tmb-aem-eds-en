import { getMetadata } from "../../scripts/aem.js";
import { img } from "../../scripts/dom-helpers.js";

function htmlToElement(htmlString) {
  if (!htmlString) return document.createElement('div');
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}

function extractTitleFromHtml(rawHtml, pagePath) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");

  // 1. Prioritize a specific <meta> tag for cleaner breadcrumb text (e.g., dedicated "breadcrumb-title")
  const metaTitle = doc.querySelector('meta[name="breadcrumb-title"]');
  if (metaTitle && metaTitle.content) {
    if (metaTitle.content?.toLowerCase() === 'exclude') return '';
    return metaTitle.content;
  }

  // 2. Fallback to the standard <title> tag
  const title = doc.querySelector("title");
  if (title && title.textContent) {
    // Clean up the title for display (e.g., remove common site suffixes)
    const cleanTitle = title.textContent.split("|")[0].trim();
    return cleanTitle;
  }

  // 3. Fallback to the URL segment if no title is found
  return pagePath.split("/").pop().replace(/-/g, " ");
}

async function getBreadcrumbName(pagePath, isCurrent) {
  // pagePath should be the full internal path, e.g., '/products/category-name'
  const basePath = getMetadata('base-path');
  try {
    const response = await fetch(`${basePath}${pagePath}`);

    if (!response.ok) {
      // Handle HTTP errors (e.g., 404)
      throw new Error(`Failed with status ${response.status}`);
    }

    const rawHtml = await response.text();

    // Pass the raw HTML to the parser
    const title = extractTitleFromHtml(rawHtml, pagePath, isCurrent);

    if (isCurrent) return title;
    return `<a href="${basePath}${pagePath}">${title}</a>`;
  } catch (error) {
    console.error(`Error fetching or parsing ${pagePath}:`, error);
    // Fallback title derived from URL segment
    return pagePath.split("/").pop().replace(/-/g, " ");
  }
}

export default async function decorate(block) {
  if (block.classList.contains('static-breadcrumb')) {
    const breadcrumbData = block?.querySelector('p');
    const splitCrumb = breadcrumbData?.innerHTML?.trim()?.split(' / ');
    block.innerHTML = breadcrumbData.innerHTML?.trim()?.replaceAll(' / ', '<span>/</span>');

    if (window.innerWidth <= 767 && splitCrumb?.length > 2) {
      const ctaBtn = splitCrumb?.map((item) => item?.trim())?.[splitCrumb.length - 2];
      block.innerHTML = ctaBtn;
      block?.querySelector('a')?.insertAdjacentElement('afterbegin', img({ src: '/icons/chevron-left-green.svg' }));
    }

    return;
  }

  const basePath = getMetadata('base-path');
  const urlPathArr = window.location.pathname.split("/").slice(4);
  const promiseArr = urlPathArr.map((_, index) => {
    const path = window.location.pathname.split("/").slice(4, ((urlPathArr.length + 4) - index));
    return getBreadcrumbName(`/${path.join('/')}`, index === 0);
  });
  const resolvedPromises = await Promise.all(promiseArr);
  const reversedArray = resolvedPromises?.reverse();
  if (window.innerWidth <= 767 && urlPathArr?.length > 1) {
    const lastBtn = htmlToElement(reversedArray.splice(-2, 1)?.[0]);
    lastBtn?.insertAdjacentElement('afterbegin', img({ src: '/icons/chevron-left-green.svg' }));
    block.innerHTML = '';
    block.appendChild(lastBtn);
  } else {
    block.innerHTML = `<a href="${basePath}/">Home</a><span>/</span>${reversedArray.join("<span>/</span>")}`;
  }
}
