// import { createOptimizedPicture } from "../../scripts/aem.js";
// import { moveInstrumentation } from "../../scripts/scripts.js";
// import decorateBankingGoods from "./banking-goods.js";
// import expandableTiles from "./expandable-tiles.js";
// import decorateOnlineBanking from "./online-banking.js";

// export default function decorate(block) {
//   if (block.classList.contains("expandable-tiles")) {
//     expandableTiles(block);
//   } else {
//     /* change to ul, li */
//     const ul = document.createElement("ul");
//     [...block.children].forEach((row) => {
//       const li = document.createElement("li");
//       moveInstrumentation(row, li);
//       while (row.firstElementChild) li.append(row.firstElementChild);
//       [...li.children].forEach((div) => {
//         if (div.children.length === 1 && div.querySelector("picture")) div.className = "cards-card-image";
//         else div.className = "cards-card-body";
//       });
//       ul.append(li);
//     });
//     ul.querySelectorAll("picture > img").forEach((img) => {
//       const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
//         { width: "750" },
//       ]);
//       moveInstrumentation(img, optimizedPic.querySelector("img"));
//       img.closest("picture").replaceWith(optimizedPic);
//     });
//     block.textContent = "";
//     block.append(ul);

//     setTimeout(() => {
//       if (block.closest('.online-banking')) {
//         decorateOnlineBanking(block);
//       } else if (block.closest('.banking-goods')) {
//         decorateBankingGoods(block);
//       }
//     });
//   }

// }


// trial 2 starts

import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import decorateBankingGoods from "./banking-goods.js";
import expandableTiles from "./expandable-tiles.js";
import decorateOnlineBanking from "./online-banking.js";

export default function decorate(block) {
  if (block.classList.contains("expandable-tiles")) {
    expandableTiles(block);
    return;
  }

  const ul = document.createElement("ul");

  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture")) {
        div.className = "cards-card-image";
      } else {
        div.className = "cards-card-body";
      }
    });

    ul.append(li);
  });

  /* Optimize images */
  ul.querySelectorAll("picture > img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
  });

  /* ---------- BUTTON FIX (SAFE VERSION) ---------- */
  const VALID_BUTTON_TYPES = ["primary", "secondary"]; // only allow valid types

  ul.querySelectorAll("li").forEach((li) => {
    const bodies = [...li.querySelectorAll(".cards-card-body")];

    bodies.forEach((body) => {
      const anchor = body.querySelector("a.button");
      if (!anchor) return;

      const nextBody = body.nextElementSibling;
      if (!nextBody || !nextBody.classList.contains("cards-card-body")) return;

      const type = nextBody.textContent?.trim();

      if (VALID_BUTTON_TYPES.includes(type)) {
        anchor.classList.add(type);
        nextBody.remove(); // remove the extra body containing type
      }
    });
  });
  /* ---------- END BUTTON FIX ---------- */

  block.textContent = "";
  block.append(ul);

  setTimeout(() => {
    if (block.closest(".online-banking")) {
      decorateOnlineBanking(block);
    } else if (block.closest(".banking-goods")) {
      decorateBankingGoods(block);
    }
  });
}
