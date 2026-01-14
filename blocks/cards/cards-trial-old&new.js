import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import decorateBankingGoods from "./banking-goods.js";
import expandableTiles from "./expandable-tiles.js";
import decorateOnlineBanking from "./online-banking.js";

/**
 * Helper to build the <a> tag using raw text from authored paragraphs
 */
function createCustomButton(linkEl, textEl, titleEl, typeEl) {
  const url = linkEl?.textContent?.trim();
  const label = textEl?.textContent?.trim();
  const title = titleEl?.textContent?.trim();
  const style = typeEl?.textContent?.trim() || '';

  if (url && label) {
    const a = document.createElement('a');
    a.href = url;
    a.textContent = label;
    a.title = title || label;
    a.className = style ? `button ${style}` : 'button';
    return a;
  }
  return null;
}

export default function decorate(block) {
  if (block.classList.contains("expandable-tiles")) {
    expandableTiles(block);
    return;
  }

  const ul = document.createElement("ul");

  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    // 1. Setup Containers
    const cardImage = document.createElement('div');
    cardImage.className = 'cards-card-image';
    const cardBody = document.createElement('div');
    cardBody.className = 'cards-card-body';

    let hasImage = false; // Flag to track if an image exists

    // 2. Distribute Content
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic) {
        cardImage.append(pic);
        hasImage = true; // Mark as true if picture is found
      } else {
        // This is your content cell
        const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
        const description = cell.querySelector('p');

        if (heading) cardBody.append(heading);
        if (description) cardBody.append(description);

        // 3. Build Buttons into a single Container with a <strong> wrapper
        const allPs = [...cell.querySelectorAll('p')];
        const buttonWrapper = document.createElement('p');
        buttonWrapper.className = 'button-container';
        const strongWrapper = document.createElement('strong');

        // Button 1 (Indices: 1=Link, 2=Text, 3=Title, 4=Type)
        const btn1 = createCustomButton(allPs[1], allPs[2], allPs[3], allPs[4]);

        // Button 2 (Indices: 5=Link, 6=Text, 7=Title, 8=Type)
        const btn2 = createCustomButton(allPs[5], allPs[6], allPs[7], allPs[8]);

        if (btn1) strongWrapper.append(btn1);
        if (btn2) strongWrapper.append(btn2);

        if (strongWrapper.hasChildNodes()) {
          buttonWrapper.append(strongWrapper);
          cardBody.append(buttonWrapper);
        }
      }
    });

    // 4. Conditional Append: Only add image div if it has content
    if (hasImage) {
      li.append(cardImage);
    }

    li.append(cardBody);
    ul.append(li);
  });

  block.textContent = "";
  block.append(ul);

  /* Optimize images */
  ul.querySelectorAll("img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }]);
    img.closest("picture").replaceWith(optimizedPic);
  });

  // Call downstream decorators
  setTimeout(() => {
    if (block.closest(".online-banking")) {
      decorateOnlineBanking(block);
    } else if (block.closest(".banking-goods")) {
      decorateBankingGoods(block);
    }
  });
}
