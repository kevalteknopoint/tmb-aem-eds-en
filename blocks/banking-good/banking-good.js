import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  // Step 1: Create wrapper div
  const wrapper = document.createElement("div");
  wrapper.classList.add("banking-good");

  // Step 2: Get background image from first row if exists
  const firstRow = block.children[0];
  if (firstRow && firstRow.querySelector("img")) {
    const img = firstRow.querySelector("img");
    wrapper.style.backgroundImage = `url('${img.src}')`;
    // wrapper.style.backgroundSize = "cover";
    // wrapper.style.backgroundPosition = "center";
    // wrapper.style.backgroundRepeat = "no-repeat";

    // Remove the image row from DOM since it's used as bg
    firstRow.remove();
  }

  // Step 3: Create UL for content
  const ul = document.createElement("ul");

  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    // Move all row children inside li
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Assign a class
    li.className = "banking-good-item";

    ul.append(li);
  });

  // Step 4: If first element is heading, move it above UL
  let heading = null;
  const firstLi = ul.querySelector("li");
  if (firstLi && firstLi.querySelector("h3")) {
    heading = firstLi.querySelector("h3");
    firstLi.removeChild(heading);
  }

  // Step 5: Clean up block and append structure
  block.textContent = "";
  if (heading) wrapper.appendChild(heading);
  wrapper.appendChild(ul);
  block.append(wrapper);
}
