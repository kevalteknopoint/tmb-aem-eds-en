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
//   const section = document.querySelector(".interest-rates-section");
// //   const Ratessection = document.querySelector(".account-fees-section");

//   if (!section) return;

//   const waitForSection = setInterval(() => {
//     if (section.getAttribute("data-section-status") === "loaded") {
//       clearInterval(waitForSection);

//       // now safe to select!
//       const ratesWrapper = section.querySelectorAll(".default-content-wrapper");
//       ratesWrapper.forEach(el => el.classList.add("interest-rates-wrapper"));

//       const ratesColumn = section.querySelectorAll(".columns-wrapper");
//       ratesColumn.forEach(el => el.classList.add("interest-rates-columns"));

//       const ratesList = section.querySelectorAll(".columns.block > div");
//       ratesList.forEach(el => el.classList.add("interest-rates-list"));

//     //   const rate = section.querySelectorAll(".columns.block > div:nth-child(2)");
//     //   rate.classList.add("interest-rates-list-2");
//     }
//   }, 50);
// }
export default function decorateInterestRates(block) {
  // Determine which section this block belongs to
  const section = block.closest('.interest-rates-section, .account-fees-section');
  if (!section) return;

  // Wait for the section to be fully loaded
  const waitForSection = setInterval(() => {
    if (section.getAttribute("data-section-status") === "loaded") {
      clearInterval(waitForSection);

      // Add wrapper classes
      const wrappers = section.querySelectorAll(".default-content-wrapper");
      wrappers.forEach(el => el.classList.add("interest-rates-wrapper"));

      document.querySelectorAll('.interest-rates-wrapper').forEach((el, index) => {
            el.classList.add(`interest-rates-wrapper-${index + 1}`);
        });

      // Add columns classes
      const columns = section.querySelectorAll(".columns-wrapper");
      columns.forEach(el => el.classList.add("interest-rates-columns"));

       document.querySelectorAll('.interest-rates-columns').forEach((el, index) => {
            el.classList.add(`interest-rates-columns-${index + 1}`);
        });



      // Add list item classes
      const lists = section.querySelectorAll(".columns.block > div");
      lists.forEach(el => el.classList.add("interest-rates-list"));

               document.querySelectorAll('.interest-rates-list').forEach((el, index) => {
            el.classList.add(`interest-rates-list-${index + 1}`);
        });
          const accountFees = document.querySelector(".account-fees-section .interest-rates-list-6 > div");
        accountFees?.classList?.add("fee-type-content");

      // Optional: handle last block note differently for account-fees-section
      if (section.classList.contains('account-fees-section')) {
        const lastColumns = section.querySelectorAll(".columns-wrapper:last-of-type .columns.block > div");
        lastColumns.forEach(el => el.classList.add("account-fees-note"));
      }
    }
  }, 50);
  
}


document.querySelectorAll('.block').forEach(block => {
  // Only decorate if inside interest-rates-section or account-fees-section
  if (block.closest('.interest-rates-section, .account-fees-section')) {
    decorateInterestRates(block);
  }
});
