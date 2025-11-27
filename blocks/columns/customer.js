export default async function decorateCustomer(block) {
  const columns = block.querySelector(".columns-wrapper div");
  columns.classList.add("columns-container");
  const customerLinkContent = document.querySelector(".customer .default-content-wrapper");
  customerLinkContent.classList.add("content-container");

  if (customerLinkContent) {
    const paragraphs = customerLinkContent.querySelectorAll("p");
    paragraphs.forEach((p, idx) => {
      p.classList.add(`para-${idx}`);
    });
  }
}
