export default function decorateTable() {
  const sections = document.querySelectorAll(".interest-table-section");
  sections.forEach((section) => {
    const headingContainers = section.querySelectorAll(
      ".default-content-wrapper"
    );
    headingContainers.forEach((hc) => {
      hc.classList.add("heading-container");
    });
    const uls = section.querySelectorAll(".heading-container ul");
    uls.forEach((ul, idx) => {
      ul.classList.add(`ul-${idx}`);
    });
  });
}
