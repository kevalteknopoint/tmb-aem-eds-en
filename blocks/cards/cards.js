import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import expandableTiles from "./expandable-tiles.js";

export default function decorate(block) {
  if (block.classList.contains("expandable-tiles")) {
    expandableTiles(block);
  } else {
    /* change to ul, li */
    const ul = document.createElement("ul");
    [...block.children].forEach((row) => {
      const li = document.createElement("li");
      moveInstrumentation(row, li);
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector("picture"))
          div.className = "cards-card-image";
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
    // online banking help js starts
    const cardsUl = block.querySelector(
      ".online-banking .cards-wrapper .cards ul"
    );
    cardsUl.classList.add("banking-cards-ul");
    block.querySelectorAll(".banking-cards-ul > li").forEach((li, idx) => {
      li.classList.add(`banking-li-${idx + 1}`);
    });
    block
      .querySelectorAll(
        ".online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body ul"
      )
      .forEach((blockUl, idx) => {
        blockUl.classList.add(`card-bottom-${idx + 1}`);
      });
    block
      .querySelectorAll(
        ".online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body li"
      )
      .forEach((li, idx) => {
        li.classList.add(`banking-desc-${idx + 1}`);
      });
    block
      .querySelectorAll(
        ".online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body ul"
      )
      .forEach((blockUl, idx) => {
        blockUl.classList.add(`card-bottom-${idx + 1}`);
      });
    block
      .querySelectorAll(
        ".online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body li"
      )
      .forEach((li, idx) => {
        li.classList.add(`banking-desc-${idx + 1}`);
      });
    // online banking help js end
  }

  console.log(block);
}
