import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  console.log('inside')
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

  let mobileHeading = null;

  const firstLi = ul.querySelector("li");
  if (firstLi) {
    if (block.dataset["mobile-heading"]) {
      mobileHeading = document.createElement("h3");
      mobileHeading.classList.add("mobile-heading");
      mobileHeading.textContent = block.dataset["mobile-heading"];
    }
  }

  block.textContent = "";

  if (mobileHeading) {
    wrapper.appendChild(mobileHeading);
  }

  wrapper.appendChild(ul);
  block.append(wrapper);
  const bottomUl = document.querySelectorAll('.banking-good-wrapper:not(.card-1) .banking-good-item:nth-child(3) >div >ul >li');
  bottomUl.forEach((liItem, index) => {
    liItem.classList.add(`bottom-li-${index + 1}`);
  });
}
