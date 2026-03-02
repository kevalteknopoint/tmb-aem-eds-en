export default function decorate(block) {
  if (window.location.href.includes("author")) return;

  [...block.children].forEach((row, index) => {
    if (row.querySelector('.icon svg') && index === 0) {
      row.classList.add('icon');
    } else if (index === 1) {
      row.classList.add('alert-text');
    } else if (index === 2) {
      const closeIcon = row.querySelector('.icon svg');
      if (closeIcon) {
        row.classList.add('icon-close');

        closeIcon.addEventListener('click', (e) => {
          e.preventDefault();
          row.closest('.alerts-wrapper')?.classList.add('d-none');
        });
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
