export default async function decorate(block) {
  const icons = block.querySelectorAll(
    ".quick-links-wrapper > .quick-links > div > div > p > .icon:last-child > img"
  );

  icons.forEach((icon) => {
    icon.style.cursor = "pointer";

    icon.addEventListener("click", (e) => {
      e.stopPropagation();

      const heading = icon.closest("p");
      if (!heading) return;

      const ul = heading.nextElementSibling;
      if (ul && ul.tagName === "UL") {
        ul.classList.toggle("active");
        icon.classList.toggle("rotated");
      }
    });
  });
}
