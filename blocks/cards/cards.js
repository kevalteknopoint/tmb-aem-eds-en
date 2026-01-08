import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import decorateBankingGoods from "./banking-goods.js";
import expandableTiles from "./expandable-tiles.js";
import decorateOnlineBanking from "./online-banking.js";
import newsHelpful from "./news-helpful.js";
import newsHomepage from "./news-homepage.js";
import decorateLookingAnotherway from "./looking-for-anotherway.js";
import milestones from "./milestones.js";

export default function decorate(block) {
  if (block.classList.contains("expandable-tiles")) {
    expandableTiles(block);
  } else if (block.closest(".milestones")) {
    milestones(block);
  } else if (block.closest(".news-helpful-homepage")) {
    newsHomepage(block);
  } else if (block.closest(".news-helpful")) {
    newsHelpful(block);
  }else {
    /* change to ul, li */
    const ul = document.createElement("ul");
    [...block.children].forEach((row) => {
      const li = document.createElement("li");
      moveInstrumentation(row, li);
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector("picture")) div.className = "cards-card-image";
        else div.className = "cards-card-body";
      });
      ul.append(li);
    });
    ul.querySelectorAll("picture > img").forEach((img) => {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
        { width: "750" },
      ]);
      moveInstrumentation(img, optimizedPic.querySelector("img"));
      img.closest("picture").replaceWith(optimizedPic);
    });
    block.textContent = "";
    block.append(ul);

    setTimeout(() => {
      if (block.closest('.online-banking')) {
        decorateOnlineBanking(block);
      } else if (block.closest('.banking-goods')) {
        decorateBankingGoods(block);
      } else if (block.closest('.looking-for-another-way')) {
        decorateLookingAnotherway(block);
      }
    });
  }
  if (block.closest(".news-helpful-homepage")) {
    console.log('inside');
    newsHomepage(block);
  }

}
