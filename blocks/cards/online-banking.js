// export default function decorateOnlineBanking(block) {
//   // online banking help js starts
//   const cardsUl = block.querySelector(
//     ".online-banking .cards-wrapper .cards ul"
//   );
//   cardsUl.classList.add("banking-cards-ul");
//   block.querySelectorAll(".banking-cards-ul > li").forEach((li, idx) => {
//     li.classList.add(`banking-li-${idx + 1}`);
//   });
//   block
//     .querySelectorAll(
//       ".online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body ul"
//     )
//     .forEach((blockUl, idx) => {
//       blockUl.classList.add(`card-bottom-${idx + 1}`);
//     });
//   block
//     .querySelectorAll(
//       ".online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body li"
//     )
//     .forEach((li, idx) => {
//       li.classList.add(`banking-desc-${idx + 1}`);
//     });
//   block
//     .querySelectorAll(
//       ".online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body ul"
//     )
//     .forEach((blockUl, idx) => {
//       blockUl.classList.add(`card-bottom-${idx + 1}`);
//     });
//   block
//     .querySelectorAll(
//       ".online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body li"
//     )
//     .forEach((li, idx) => {
//       li.classList.add(`banking-desc-${idx + 1}`);
//     });
//   // online banking help js end
// }


// trial 
// import { div, p, strong, a } from "../../scripts/dom-helpers.js";

// export default function decorateOnlineBanking(block) {
//   // 1. Identify all high-level authored rows
//   const rows = [...block.children];

//   rows.forEach((row, idx) => {
//     // Replace the default LI-style behavior by using DIVs
//     row.classList.add('banking-div-item', `banking-item-${idx + 1}`);

//     // 2. Identify all 'cards-card-body' divs created by your JSON containers
//     const bodies = [...row.querySelectorAll('.cards-card-body')];
    
//     if (bodies.length > 0) {
//       // The first body usually contains the authored 'Text' (richtext)
//       const mainBody = bodies[0];

//       // 3. Setup a single consolidated button container
//       const unifiedBtnContainer = p({ class: 'button-container' });
//       const strongWrapper = strong();

//       // 4. Extract Button 1 (Authored via first container)
//       const btn1Anchor = row.querySelector('a');
//       if (btn1Anchor) {
//         btn1Anchor.className = 'button primary';
//         strongWrapper.append(btn1Anchor);
//       }

//       // 5. Extract Button 2 Data (from fragmented text nodes in sibling bodies)
//       // We look for the text authored in "linkText-2" and "linkType-2"
//       const allPs = [...row.querySelectorAll('p')];
//       const b2Text = allPs.find(p => p.textContent.trim() === 'Discover More' || p.textContent.trim() === 'discover-more');
//       const b2Class = allPs.find(p => p.textContent.trim() === 'secondary' || p.textContent.trim() === 'primary');

//       if (b2Text) {
//         const btn2 = a({
//           href: '#', // Replace with logic to find the specific href if needed
//           title: b2Text.textContent.trim(),
//           class: `button ${b2Class ? b2Class.textContent.trim() : 'secondary'}`
//         });
//         btn2.textContent = b2Text.textContent.trim();
//         strongWrapper.append(btn2);

//         // Remove the raw text paragraphs so they don't leak into the UI
//         b2Text.remove();
//         if (b2Class) b2Class.remove();
//       }

//       // 6. Cleanup and Re-assembly
//       if (strongWrapper.hasChildNodes()) {
//         unifiedBtnContainer.append(strongWrapper);
//         mainBody.append(unifiedBtnContainer);
//       }

//       // Remove extra body divs that were created by the JSON containers
//       bodies.slice(1).forEach(extraBody => extraBody.remove());
      
//       // Remove any leftover empty divs
//       [...row.children].forEach(child => {
//         if (child.innerHTML.trim() === '' && !child.querySelector('img')) {
//           child.remove();
//         }
//       });
//     }
//   });
// }

//trial 2

export default function decorateOnlineBanking(block) {
  // 1. Identify all high-level authored rows (the DIVs inside the block)
  const rows = [...block.children];

  rows.forEach((row, idx) => {
    // Standard EDS row setup
    row.classList.add('banking-div-item', `banking-item-${idx + 1}`);

    // 2. Locate all content-bearing bodies
    const bodies = [...row.querySelectorAll('.cards-card-body')];
    
    if (bodies.length > 0) {
      // Find the main body that contains your Text and Heading
      // Usually, EDS puts the first few JSON fields in the first few bodies
      const mainBody = bodies.find(b => b.querySelector('h1, h2, h3, h4, h5, h6, p')) || bodies[0];

      // 3. Create the unified button container and strong wrapper
      const unifiedBtnContainer = document.createElement('p');
      unifiedBtnContainer.className = 'button-container';
      const strongWrapper = document.createElement('strong');

      // 4. Extract Button 1 (Authored via first button container)
      const btn1Anchor = row.querySelector('a');
      if (btn1Anchor) {
        btn1Anchor.className = 'button primary';
        strongWrapper.append(btn1Anchor);
      }

      // 5. Extract Button 2 Data
      // We look for paragraphs containing the authored values for Button 2
      const allPs = [...row.querySelectorAll('p')];
      const b2Text = allPs.find(p => p.textContent.trim() === 'Discover More' || p.textContent.trim() === 'discover-more');
      const b2Class = allPs.find(p => p.textContent.trim() === 'secondary' || p.textContent.trim() === 'primary');

      if (b2Text) {
        const btn2 = document.createElement('a');
        btn2.href = '#'; // Logic to find specific href if necessary
        btn2.title = b2Text.textContent.trim();
        btn2.textContent = b2Text.textContent.trim();
        btn2.className = `button ${b2Class ? b2Class.textContent.trim() : 'secondary'}`;
        strongWrapper.append(btn2);

        // Remove the raw text paragraphs so they don't leak into the UI
        b2Text.remove();
        if (b2Class) b2Class.remove();
      }

      // 6. Cleanup and Final Re-assembly
      if (strongWrapper.hasChildNodes()) {
        unifiedBtnContainer.append(strongWrapper);
        mainBody.append(unifiedBtnContainer);
      }

      // CRITICAL: Remove all extra body divs EXCEPT the one we consolidated everything into
      bodies.forEach(body => {
        if (body !== mainBody) body.remove();
      });

      // Remove any leftover empty sibling divs that EDS created for the JSON containers
      [...row.children].forEach(child => {
        if (child !== mainBody && !child.querySelector('img, picture') && child.innerHTML.trim() === '') {
          child.remove();
        }
      });
    }
  });
}