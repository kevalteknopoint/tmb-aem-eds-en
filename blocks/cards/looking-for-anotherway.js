export default function decorateLookingAnotherway(block) {
  block.querySelectorAll("li").forEach((li) => {
    const contentP = li.querySelector("p:not(.button-container)");
    if (contentP) {
      contentP.classList.add("card-text");
    }

    if (!li.querySelector('.cards-card-body')?.children?.length) li.querySelector('.cards-card-body')?.remove();
  });

  block.querySelectorAll("li p.button-container").forEach((p) => {
    p.classList.add("card-button");
  });
}
