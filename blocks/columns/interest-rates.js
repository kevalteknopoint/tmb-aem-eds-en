// export default function decorateInterestRates() {
//       const ratesWrapper = document.querySelector(".interest-rates-section .default-content-wrapper");
//   ratesWrapper?.classList?.add("interest-rates-wrapper");

//         const ratesColumn = document.querySelector(".interest-rates-section .columns-wrapper");
//   ratesColumn?.classList?.add("interest-rates-columns");

// const ratesList = document.querySelectorAll(
//   ".interest-rates-section .interest-rates-columns .block > div"
// );

// ratesList.forEach(div => {
//   div.classList.add("interest-rates-list");
// });
// }


// export default function decorateInterestRates() {
//   const ratesWrapper = document.querySelectorAll(".interest-rates-section .default-content-wrapper");
//   ratesWrapper.forEach(el => el.classList.add("interest-rates-wrapper"));

//   const ratesColumn = document.querySelectorAll(".interest-rates-section .columns-wrapper");
//   ratesColumn.forEach(el => el.classList.add("interest-rates-columns"));

//   const ratesList = document.querySelectorAll(".interest-rates-section .interest-rates-columns .block > div");
//   ratesList.forEach(div => div.classList.add("interest-rates-list"));
// }

export default function decorateInterestRates() {
  const section = document.querySelector(".interest-rates-section");

  if (!section) return;

  const waitForSection = setInterval(() => {
    if (section.getAttribute("data-section-status") === "loaded") {
      clearInterval(waitForSection);

      // now safe to select!
      const ratesWrapper = section.querySelectorAll(".default-content-wrapper");
      ratesWrapper.forEach(el => el.classList.add("interest-rates-wrapper"));

      const ratesColumn = section.querySelectorAll(".columns-wrapper");
      ratesColumn.forEach(el => el.classList.add("interest-rates-columns"));

      const ratesList = section.querySelectorAll(".columns.block > div");
      ratesList.forEach(el => el.classList.add("interest-rates-list"));

    //   const rate = section.querySelectorAll(".columns.block > div:nth-child(2)");
    //   rate.classList.add("interest-rates-list-2");
    }
  }, 50);
}
