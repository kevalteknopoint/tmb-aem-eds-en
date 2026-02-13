export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  [...block.children].forEach((row) => {
    const iconElement = row.querySelector(".icon, svg");

    if (iconElement) {
      if (
        row.querySelector(".icon-close-icon") ||
        iconElement.classList.contains("icon-close-icon")
      ) {
        row.classList.add("icon-close");
      } else {
        row.classList.add("icon");
      }
    } else {
      if (row.textContent.trim() !== "") {
        row.classList.add("alert-text");
      } else {
        row.remove();
      }
    }
  });

  const closeIcons = block.querySelectorAll(".icon-close");
  closeIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const alertDiv = event.currentTarget.closest(".alerts");

      if (alertDiv) {
        alertDiv.style.display = "none";
      }
    });
  });
}
