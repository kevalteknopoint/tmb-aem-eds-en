export default function decorateOnlineBanking(block) {
  // online banking help js starts
  const cardsUl = block.querySelector(
    ".online-banking .cards-wrapper .cards ul"
  );
  cardsUl?.classList.add("banking-cards-ul");
  block.querySelectorAll(".banking-cards-ul > li").forEach((li, idx) => {
    li.classList.add(`banking-li-${idx + 1}`);
  });
  block
    .querySelectorAll(
      ".online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body ul"
    )
    .forEach((blockUl, idx) => {
      blockUl.classList.add(`card-bottom-${idx + 1}`);
    });
  block
    .querySelectorAll(
      ".online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body li"
    )
    .forEach((li, idx) => {
      li.classList.add(`banking-desc-${idx + 1}`);
    });
  block
    .querySelectorAll(
      ".online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body ul"
    )
    .forEach((blockUl, idx) => {
      blockUl.classList.add(`card-bottom-${idx + 1}`);
    });
  block
    .querySelectorAll(
      ".online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body li"
    )
    .forEach((li, idx) => {
      li.classList.add(`banking-desc-${idx + 1}`);
    });
  // online banking help js end
}
