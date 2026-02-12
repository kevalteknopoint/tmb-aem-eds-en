export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  [...block.children].forEach((row) => {
    // if icon present
    if (row.querySelector(".icon, svg")) {
      if (
        row.querySelector(".icon, svg").className.includes("icon-close-icon")
      ) {
        row.classList.add("icon-close");
      } else {
        row.classList.add("icon");
      }
    } else {
      row.classList.add("alert-text");
    }
  });
}
