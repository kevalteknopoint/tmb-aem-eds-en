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

// import { createOptimizedPicture } from "../../scripts/aem.js";
// import { moveInstrumentation } from "../../scripts/scripts.js";
// import decorateBankingGoods from "./banking-goods.js";
// import expandableTiles from "./expandable-tiles.js";
// import decorateOnlineBanking from "./online-banking.js";

// export default function decorate(block) {
//   if (block.classList.contains("expandable-tiles")) {
//     expandableTiles(block);
//     return;
//   }

//   const ul = document.createElement("ul");

//   [...block.children].forEach((row) => {
//     const li = document.createElement("li");
//     moveInstrumentation(row, li);

//     while (row.firstElementChild) {
//       li.append(row.firstElementChild);
//     }

//     [...li.children].forEach((div) => {
//       if (div.children.length === 1 && div.querySelector("picture")) {
//         div.className = "cards-card-image";
//       } else {
//         div.className = "cards-card-body";
//       }
//     });

//     ul.append(li);
//   });

//   /* Optimize images */
//   ul.querySelectorAll("picture > img").forEach((img) => {
//     const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
//       { width: "750" },
//     ]);
//     moveInstrumentation(img, optimizedPic.querySelector("img"));
//     img.closest("picture").replaceWith(optimizedPic);
//   });

//   /* ---------- BUTTON FIX (SAFE VERSION) ---------- */
//   const VALID_BUTTON_TYPES = ["primary", "secondary"]; // only allow valid types

//   ul.querySelectorAll("li").forEach((li) => {
//     const bodies = [...li.querySelectorAll(".cards-card-body")];

//     bodies.forEach((body) => {
//       const anchor = body.querySelector("a.button");
//       if (!anchor) return;

//       const nextBody = body.nextElementSibling;
//       if (!nextBody || !nextBody.classList.contains("cards-card-body")) return;

//       const type = nextBody.textContent?.trim();

//       if (VALID_BUTTON_TYPES.includes(type)) {
//         anchor.classList.add(type);
//         nextBody.remove(); // remove the extra body containing type
//       }
//     });
//   });
//   /* ---------- END BUTTON FIX ---------- */

//   block.textContent = "";
//   block.append(ul);

//   setTimeout(() => {
//     if (block.closest(".online-banking")) {
//       decorateOnlineBanking(block);
//     } else if (block.closest(".banking-goods")) {
//       decorateBankingGoods(block);
//     }
//   });
// }


// trial 3

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

  [...block.children].forEach((row, rowIndex) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    /* 🔥 REMOVE EMPTY / JUNK DIVS FIRST */
    [...li.children].forEach((div) => {
      const hasContent = div.querySelector(
        "h1,h2,h3,h4,h5,h6,p,ul,ol,a,picture,img,button"
      );
      if (!hasContent) div.remove();
    });

    let bodyCreated = false;
    let cardBody = null;

    [...li.children].forEach((div, i) => {
      // IMAGE CARD
      if (div.children.length === 1 && div.querySelector("picture")) {
        div.className = "cards-card-image";
        return;
      }

      // BODY CARD (ONLY ONCE)
      if (!bodyCreated) {
        bodyCreated = true;
        div.className = "cards-card-body";
        cardBody = div;

        /* CREATE BUTTON INSIDE BODY */
        const id = `${rowIndex}-${i}`;
        const button = document.createElement("button");

        button.className = "tabs-tab";
        button.id = `tab-${id}`;
        button.textContent = "Learn More";
        button.setAttribute("aria-controls", `tabpanel-${id}`);
        button.setAttribute("aria-selected", "false");
        button.setAttribute("role", "tab");
        button.setAttribute("type", "button");

        button.addEventListener("click", () => {
          let prevActiveBtnIdx = 0;

          block.querySelectorAll("[role=tabpanel]").forEach((panel) => {
            panel.setAttribute("aria-hidden", "true");
          });

          block.querySelectorAll("button[role=tab]").forEach((btn, btnIdx) => {
            if (btn.getAttribute("aria-selected") === "true") {
              prevActiveBtnIdx = btnIdx;
            }
            btn.setAttribute("aria-selected", "false");
            btn.classList.remove("left-to-right", "right-to-left");
          });

          button.setAttribute("aria-selected", "true");

          if (prevActiveBtnIdx < i) {
            button.classList.add("left-to-right");
          } else if (prevActiveBtnIdx > i) {
            button.classList.add("right-to-left");
          }
        });

        cardBody.append(button);
        return;
      }
    });

    /* 🔥 MOVE AUTHORED CTA INTO CARD BODY */
    if (cardBody) {
      const ctaContainer = li.querySelector(".button-container");
      if (ctaContainer) {
        cardBody.append(ctaContainer);
      }
    }

    ul.append(li);
  });

  block.textContent = "";
  block.append(ul);

  /* 🔥 REMOVE EXISTING tabs-tab BUTTONS (if any left from AEM) */
  ul.querySelectorAll("button.tabs-tab:not(:first-child)").forEach((btn) => {
    btn.remove();
  });

  /* Optimize images */
  ul.querySelectorAll("picture > img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
  });

  setTimeout(() => {
    if (block.closest(".online-banking")) {
      decorateOnlineBanking(block);
    } else if (block.closest(".banking-goods")) {
      decorateBankingGoods(block);
    }
  });
}
