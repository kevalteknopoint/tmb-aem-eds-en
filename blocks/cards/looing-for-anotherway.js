export default function decorateLookingAnotherway(block) {
  console.log(block);
  document.querySelectorAll(".cards li").forEach((li) => {
    const contentP = li.querySelector("p:not(.button-container)");
    if (contentP) {
      contentP.classList.add("card-text");
    }
  });
  document.querySelectorAll(".cards li p.button-container").forEach((p) => {
    p.classList.add("card-button");
  });
}
