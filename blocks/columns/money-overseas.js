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

}
