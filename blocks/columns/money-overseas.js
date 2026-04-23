import { div } from "../../scripts/dom-helpers.js";
import './money-overseas-analytics.js';

export default function decorateMoneyOverseas() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".money-overseas .default-content-wrapper").forEach((el) => el.classList.add("overseas-wrapper"));

    document.querySelectorAll(".money-overseas .columns-wrapper").forEach((el) => el.classList.add("overseas-columns"));

    document.querySelectorAll(".money-overseas .columns-wrapper .columns > div").forEach((el) => el.classList.add("overseas-columns-wrapper"));

    const moneyContainerSecorder = document.querySelector(".money-overseas .overseas-columns  ul li ul");

    moneyContainerSecorder?.classList?.add("overseas-columns-wrapper-sec-ul");
    document.querySelectorAll(".money-overseas .overseas-columns  ul li ul").forEach((el) => el.classList.add("overseas-columns-wrapper-ul"));

    const targetColumns = document.querySelectorAll(".overseas-columns-wrapper");

    targetColumns?.forEach((col) => {
      const textCols = col?.querySelectorAll("div:not(:first-child)");
      textCols.forEach((textCol) => {
        const buttonContainers = Array.from(textCol.querySelectorAll('.button-container'));
        if (buttonContainers.length > 1) {
          const firstContainer = buttonContainers[0];
          buttonContainers.slice(1).forEach((container) => {
            const anchors = container.querySelectorAll('a');
            anchors.forEach((a) => firstContainer.appendChild(a));
            container.remove();
          });
        }
      });
      // apply content-with-icon in any column
      const paragraphsWithIcons = col?.querySelectorAll("p:has(span.icon)");
      paragraphsWithIcons?.forEach((pTag) => {
        // avoid double wrapping
        if (pTag.parentElement.classList.contains("content-with-icon")) return;

        const iconSpan = pTag.querySelector("span.icon");
        if (!iconSpan) return;

        // clone icon
        const iconClone = iconSpan.cloneNode(true);
        iconSpan.remove();

        // wrap
        const newDiv = div(
          { class: "content-with-icon" },
          iconClone,
          pTag.cloneNode(true)
        );
        pTag.replaceWith(newDiv);
      });
    });
  });
}
