export default function decorate(block) {
  const blockdata = Array.from(block.children);

  // Define names for the first few sections
  const sectionNames = ["first", "second", "third", "fourth", "fifth", "sixth"];

  blockdata.forEach((data, i) => {
    data.classList.add("banking-good-div", `div-count-${i + 1}`);

    const innerDivs = data.querySelectorAll(":scope > div");
    const sectionName = sectionNames[i] || `section-${i + 1}`;

    innerDivs.forEach((inner, j) => {
      inner.classList.add(`${sectionName}-div-${j + 1}`);
    });
  });
}
