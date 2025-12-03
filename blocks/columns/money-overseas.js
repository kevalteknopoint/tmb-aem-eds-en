// export default function decorateMoneyOverseas(){
// const moneyContainer = document.querySelector(".money-overseas .default-content-wrapper");
// moneyContainer?.classList?.add("overseas-wrapper");

// // const moneyContainerColumnsWrapper = document.querySelector(".money-overseas .columns-wrapper");
// // moneyContainerColumnsWrapper?.classList?.add("overseas-columns");
// document.querySelectorAll(".money-overseas .columns-wrapper")
//   .forEach(wrapper => {
//     wrapper.classList.add("overseas-columns");
//   });

//   document.querySelectorAll(".money-overseas .overseas-columns div div")
//   .forEach(wrapper => {
//     wrapper.classList.add("overseas-columns-wrapper");
//   });
// // const moneyContainersecColumns = document.querySelector(".money-overseas .columns-wrapper + div");
// // moneyContainersecColumns?.classList?.add("overseas-columns-sec");

// // const moneyContainerColumns = document.querySelector(".money-overseas .overseas-columns div div");
// // moneyContainerColumns?.classList?.add("overseas-columns-wrapper");

// // const moneyContainerColumnsSec = document.querySelector(".money-overseas .overseas-columns-sec div div");
// // moneyContainerColumnsSec?.classList?.add("overseas-columns-wrapper-sec");

// const moneyContainerSecorder = document.querySelectorAll(".money-overseas .overseas-columns-sec  ul li ul");
// moneyContainerSecorder?.classList?.add("overseas-columns-wrapper-sec-ul");
// }

export default function decorateMoneyOverseas() {

  // Add .overseas-wrapper to the content wrapper
  document
    .querySelectorAll(".money-overseas .default-content-wrapper")
    .forEach(el => el.classList.add("overseas-wrapper"));


  // Add .overseas-columns to every columns wrapper
  document
    .querySelectorAll(".money-overseas .columns-wrapper")
    .forEach(el => el.classList.add("overseas-columns"));


  // Add .overseas-columns-wrapper to every nested div inside .columns
  document
    .querySelectorAll(".money-overseas .columns-wrapper .columns > div")
    .forEach(el => el.classList.add("overseas-columns-wrapper"));


  // If you want the DIVs inside those DIVs also to get the class:
//   document
//     .querySelectorAll(".money-overseas .columns-wrapper .columns > div > div")
//     .forEach(el => el.classList.add("overseas-columns-wrapper"));
const moneyContainerSecorder = document.querySelector(".money-overseas .overseas-columns  ul li ul");
moneyContainerSecorder?.classList?.add("overseas-columns-wrapper-sec-ul");
  document
    .querySelectorAll(".money-overseas .overseas-columns  ul li ul")
    .forEach(el => el.classList.add("overseas-columns-wrapper-ul"));

}
