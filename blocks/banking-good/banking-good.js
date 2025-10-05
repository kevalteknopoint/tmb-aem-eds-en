import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {

    const goodWrapper = document.querySelectorAll('.banking-good-wrapper');
    goodWrapper.forEach((wrapper, index) => {
        wrapper.classList.add(`card-${index + 1}`);
    });

  const wrapper = document.createElement("div");
  wrapper.classList.add("banking-for-good");

  const firstRow = block.children[0];
  if (firstRow && firstRow.querySelector("img")) {
    const img = firstRow.querySelector("img");
    wrapper.style.backgroundImage = `url('${img.src}')`;

    firstRow.remove();
  }

  const ul = document.createElement("ul");

  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    while (row.firstElementChild) li.append(row.firstElementChild);

    li.className = "banking-good-item";

    ul.append(li);
  });

  let heading = null;
  const firstLi = ul.querySelector("li");
  if (firstLi && firstLi.querySelector("h3")) {
    heading = firstLi.querySelector("h3");
    firstLi.removeChild(heading);
  }

  block.textContent = "";
  if (heading) wrapper.appendChild(heading);
  wrapper.appendChild(ul);
  block.append(wrapper);

}
