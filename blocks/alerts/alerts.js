// export default function decorate(block) {
//   if (window.location.href.includes('author')) return;

//   // Alert content is already in rows, just wrap each one properly
//   [...block.children].forEach((row) => {
//     if (row.children.length < 1) return;

//     // Get content from cells
//     const titleCell = row.children[0];
//     const descCell = row.children[1] || null;

//     // Wrap title in h4
//     const titleEl = document.createElement('h4');
//     titleEl.append(...titleCell.childNodes);

//     // Wrap description in p (if exists)
//     const descEl = document.createElement('p');
//     if (descCell) {
//       descEl.append(...descCell.childNodes);
//     }

//     // Clear the row and add wrapped elements
//     row.innerHTML = '';
//     row.append(titleEl);
//     if (descCell) {
//       row.append(descEl);
//     }
//   });
// }
