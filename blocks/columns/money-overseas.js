import { injectIcon } from "../../scripts/aem.js";
import { div } from "../../scripts/dom-helpers";

export default function decorateMoneyOverseas() {
  // Add .overseas-wrapper to the content wrapper
  document
    .querySelectorAll(".money-overseas .default-content-wrapper")
    .forEach((el) => el.classList.add("overseas-wrapper"));

  // Add .overseas-columns to every columns wrapper
  document
    .querySelectorAll(".money-overseas .columns-wrapper")
    .forEach((el) => el.classList.add("overseas-columns"));

  // Add .overseas-columns-wrapper to every nested div inside .columns
  document
    .querySelectorAll(".money-overseas .columns-wrapper .columns > div")
    .forEach((el) => el.classList.add("overseas-columns-wrapper"));

  const moneyContainerSecorder = document.querySelector(".money-overseas .overseas-columns  ul li ul");
  moneyContainerSecorder?.classList?.add("overseas-columns-wrapper-sec-ul");
  document
    .querySelectorAll(".money-overseas .overseas-columns  ul li ul")
    .forEach((el) => el.classList.add("overseas-columns-wrapper-ul"));
    // const overseasWrapperdiv =document.querySelector(".overseas-variant .overseas-columns .overseas-columns-wrapper > div:nth-of-type(2)");
    // overseasWrapperdiv?.classList?.add("overseas-content-div");
    //  injectIcon('special-list-indicator');
//     const overseasWrapperdiv = document.querySelector(
//   ".overseas-variant .overseas-columns .overseas-columns-wrapper > div:nth-of-type(2)"
// );

// if (overseasWrapperdiv) {
//   overseasWrapperdiv.classList.add("overseas-content-div");

//   // find the <p> inside
//   const p = overseasWrapperdiv.querySelector("p");
//   if (p) {
//     // create wrapper div
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("content-with-icon");

//     // move <p> inside wrapper
//     wrapper.appendChild(p);

//     // create icon using your function
//     const icon = injectIcon('special-list-indicator');

//     // append the icon
//     wrapper.appendChild(icon);

//     // insert wrapper into the original div
//     overseasWrapperdiv.appendChild(wrapper);
//   }
// }
// const targetDiv = document.querySelector(
//   ".overseas-variant .overseas-columns .overseas-columns-wrapper > div:nth-of-type(2)"
// );

// if (targetDiv) {
//   const p = targetDiv.querySelector("p");

//   if (p) {
//     // REMOVE the p from its original location
//     p.remove();

//     // Create wrapper
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("content-with-icon");

//     // Create icon span FIRST
//     const iconSpan = document.createElement("span");
//     iconSpan.classList.add("icon", "icon-checkmark");

//     // Append span then p
//     wrapper.appendChild(iconSpan);
//     wrapper.appendChild(p);

//     // Insert wrapper back into the div
//     targetDiv.appendChild(wrapper);
//   }
// }

const targetColumns = document.querySelectorAll(".overseas-columns-wrapper");

targetColumns?.forEach(col => {
  const textCol = col?.querySelector('div:last-child');
  const paragraphs = textCol.querySelectorAll("p");

  paragraphs.forEach(pTag => {
    if (!pTag?.querySelector("span.icon")) return;

    const innerSpan = pTag.querySelector("span.icon")?.cloneNode(true);
    pTag.querySelector('span.icon')?.remove();
    const newDiv = div({ class: 'content-with-icon' }, innerSpan, p(...pTag?.children));
    pTag.replaceWith(newDiv);
  });
})
}
