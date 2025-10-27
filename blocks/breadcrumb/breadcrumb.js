// function extractTitleFromHtml(rawHtml, pagePath) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(rawHtml, "text/html");

//   // 1. Prioritize a specific <meta> tag for cleaner breadcrumb text (e.g., dedicated "breadcrumb-title")
//   const metaTitle = doc.querySelector('meta[name="breadcrumb-title"]');
//   if (metaTitle && metaTitle.content) {
//     return metaTitle.content;
//   }

//   // 2. Fallback to the standard <title> tag
//   const title = doc.querySelector("title");
//   if (title && title.textContent) {
//     // Clean up the title for display (e.g., remove common site suffixes)
//     const cleanTitle = title.textContent.split("|")[0].trim();
//     return cleanTitle;
//   }

//   // 3. Fallback to the URL segment if no title is found
//   return pagePath.split("/").pop().replace(/-/g, " ");
// }

// async function getBreadcrumbName(pagePath) {
//   // pagePath should be the full internal path, e.g., '/products/category-name'
//   try {
//     const response = await fetch(`${pagePath}`);

//     if (!response.ok) {
//       // Handle HTTP errors (e.g., 404)
//       throw new Error(`Failed with status ${response.status}`);
//     }

//     const rawHtml = await response.text();

//     // Pass the raw HTML to the parser
//     const title = extractTitleFromHtml(rawHtml, pagePath);

//     return title;
//   } catch (error) {
//     console.error(`Error fetching or parsing ${pagePath}:`, error);
//     // Fallback title derived from URL segment
//     return pagePath.split("/").pop().replace(/-/g, " ");
//   }
// }

export default async function decorate(block) {
  // const urlPathArr = window.location.pathname.split("/").slice(3);
  // const promiseArr = urlPathArr.map((path) => getBreadcrumbName(path));
  // const resolvedPromises = await Promise.all(promiseArr);
  // block.innerHTML = `Teacher's Mutual Bank<span>/</span>${resolvedPromises.join('<span>/</span>')}`;

  const breadcrumbData = block?.querySelector('p');
  block.innerHTML = breadcrumbData.innerHTML?.replaceAll(' / ', '<span>/</span>');
}
