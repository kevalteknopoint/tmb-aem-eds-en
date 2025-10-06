// import { moveInstrumentation } from "../../scripts/scripts.js";

// export default async function decorate(block) {

//     const goodWrapper = document.querySelectorAll('.banking-good-wrapper');
//     goodWrapper.forEach((wrapper, index) => {
//         wrapper.classList.add(`card-${index + 1}`);
//     });

//   const wrapper = document.createElement("div");
//   wrapper.classList.add("banking-for-good");

//   const firstRow = block.children[0];
//   if (firstRow && firstRow.querySelector("img")) {
//     const img = firstRow.querySelector("img");
//     wrapper.style.backgroundImage = `url('${img.src}')`;

//     firstRow.remove();
//   }

//   const ul = document.createElement("ul");

//   [...block.children].forEach((row) => {
//     const li = document.createElement("li");
//     moveInstrumentation(row, li);

//     while (row.firstElementChild) li.append(row.firstElementChild);

//     li.className = "banking-good-item";

//     ul.append(li);
//   });

//   let heading = null;
//   const firstLi = ul.querySelector("li");
//   if (firstLi && firstLi.querySelector("h3")) {
//     heading = firstLi.querySelector("h3");
//     firstLi.removeChild(heading);
//   }

//   block.textContent = "";
//   if (heading) wrapper.appendChild(heading);
//   wrapper.appendChild(ul);
//   block.append(wrapper);

// }



import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {

  // Add card-1, card-2, etc.
  const goodWrapper = document.querySelectorAll('.banking-good-wrapper');
  goodWrapper.forEach((wrapper, index) => {
    wrapper.classList.add(`card-${index + 1}`);
  });

  // Create wrapper for background image
  const wrapper = document.createElement("div");
  wrapper.classList.add("banking-for-good");

  // Set background image (first row image)
  const firstRow = block.children[0];
  if (firstRow && firstRow.querySelector("img")) {
    const img = firstRow.querySelector("img");
    wrapper.style.backgroundImage = `url('${img.src}')`;
    firstRow.remove();
  }

  // Create UL container
  const ul = document.createElement("ul");

  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    li.className = "banking-good-item";
    ul.append(li);
  });

  // Extract desktop & mobile headings
  let desktopHeading = null;
  let mobileHeading = null;

  const firstLi = ul.querySelector("li");
  if (firstLi) {
    // Desktop heading (existing <h3>)
    if (firstLi.querySelector("h3")) {
      desktopHeading = firstLi.querySelector("h3");
      firstLi.removeChild(desktopHeading);
    }

    // Mobile heading (authorable field)
    if (block.dataset["mobile-heading"]) {
      mobileHeading = document.createElement("h3");
      mobileHeading.classList.add("mobile-heading");
      mobileHeading.textContent = block.dataset["mobile-heading"];
    }
  }

  // Clear block and append content
  block.textContent = "";

  // Append headings if present
  if (desktopHeading) {
    desktopHeading.classList.add("desktop-heading");
    wrapper.appendChild(desktopHeading);
  }

  if (mobileHeading) {
    wrapper.appendChild(mobileHeading);
  }

  // Append UL
  wrapper.appendChild(ul);
  block.append(wrapper);
}
