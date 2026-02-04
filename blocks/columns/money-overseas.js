import { div } from "../../scripts/dom-helpers.js";

export default function decorateMoneyOverseas() {
  document
    .querySelectorAll(".money-overseas .default-content-wrapper")
    .forEach((el) => el.classList.add("overseas-wrapper"));

  document
    .querySelectorAll(".money-overseas .columns-wrapper")
    .forEach((el) => el.classList.add("overseas-columns"));

  document
    .querySelectorAll(".money-overseas .columns-wrapper .columns > div")
    .forEach((el) => el.classList.add("overseas-columns-wrapper"));

  const moneyContainerSecorder = document.querySelector(
    ".money-overseas .overseas-columns  ul li ul"
  );
  moneyContainerSecorder?.classList?.add("overseas-columns-wrapper-sec-ul");
  document
    .querySelectorAll(".money-overseas .overseas-columns  ul li ul")
    .forEach((el) => el.classList.add("overseas-columns-wrapper-ul"));

  const targetColumns = document.querySelectorAll(".overseas-columns-wrapper");

  targetColumns?.forEach((col) => {
    const textCols = col?.querySelectorAll("div:not(:first-child)");
    textCols.forEach((textCol) => {
      // --- 1. Restructuring Buttons (MERGE LOGIC) ---
      const buttonContainers = Array.from(textCol.querySelectorAll('.button-container'));
      if (buttonContainers.length > 1) {
        const firstContainer = buttonContainers[0];
        // Get all anchors from the 2nd container onwards and move them to the 1st
        buttonContainers.slice(1).forEach((container) => {
          const anchors = container.querySelectorAll('a');
          anchors.forEach((a) => firstContainer.appendChild(a));
          // Remove the now empty container
          container.remove();
        });
      }

      // --- 2. Handle Icons in paragraphs ---
      const paragraphs = textCol.querySelectorAll("p");
      paragraphs.forEach((pTag) => {
        if (!pTag?.querySelector("span.icon")) return;

        const innerSpan = pTag.querySelector("span.icon")?.cloneNode(true);
        pTag.querySelector("span.icon")?.remove();
        const newDiv = div(
          { class: "content-with-icon" },
          innerSpan,
          pTag.cloneNode(true)
        );
        pTag.insertAdjacentElement('afterend', newDiv);
        pTag.remove();
      });
    });
  });
}
