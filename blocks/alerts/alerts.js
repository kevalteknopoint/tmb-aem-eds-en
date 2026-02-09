// export default function decorate(block) {
//   if (window.location.href.includes('author')) return;

//   // Alert content is already in rows, just wrap each one properly
//   [...block.children].forEach((row) => {
//     if (row.children.length < 1) return;

//     // Get content from cells
//     const titleCell = row.children[0];
//     const descCell = row.children[1] || null;
//     const buttonTextCell = row.children[2] || null;
//     const buttonUrlCell = row.children[3] || null;

//     // Create content wrapper
//     const contentWrapper = document.createElement('div');
//     contentWrapper.className = 'alert-content';

//     // Wrap title in h4
//     const titleEl = document.createElement('h4');
//     titleEl.append(...titleCell.childNodes);

//     // Wrap description in p (if exists)
//     const descEl = document.createElement('p');
//     if (descCell) {
//       descEl.append(...descCell.childNodes);
//     }

//     // Create button if button text and URL exist
//     let buttonEl = null;
//     if (buttonTextCell && buttonUrlCell) {
//       const buttonText = buttonTextCell.textContent?.trim();
//       const buttonUrl = buttonUrlCell.textContent?.trim();
      
//       if (buttonText && buttonUrl) {
//         buttonEl = document.createElement('a');
//         buttonEl.href = buttonUrl;
//         buttonEl.textContent = buttonText;
//         buttonEl.className = 'alert-button';
//       }
//     }

//     // Add content to wrapper
//     contentWrapper.append(titleEl);
//     if (descCell) {
//       contentWrapper.append(descEl);
//     }
//     if (buttonEl) {
//       contentWrapper.append(buttonEl);
//     }

//     // Create close button with SVG
//     const closeBtn = document.createElement('button');
//     closeBtn.className = 'alert-close';
//     closeBtn.setAttribute('aria-label', 'Close alert');
//     closeBtn.innerHTML = `
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//         <line x1="18" y1="6" x2="6" y2="18"></line>
//         <line x1="6" y1="6" x2="18" y2="18"></line>
//       </svg>
//     `;
    
//     // Close button click handler
//     closeBtn.addEventListener('click', () => {
//       row.style.transition = 'opacity 0.3s ease';
//       row.style.opacity = '0';
//       setTimeout(() => {
//         row.remove();
//       }, 300);
//     });

//     // Clear the row and add elements
//     row.innerHTML = '';
//     row.append(contentWrapper);
//     row.append(closeBtn);
//   });
// }
