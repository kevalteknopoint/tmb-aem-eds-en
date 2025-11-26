export default function decorateCustomer(block) {
    const columns = document.querySelector(".customer .columns-wrapper .block div");
    columns.classList.add("columns-container");  
    const customerLinkContent = document.querySelector(".customer .default-content-wrapper");
    customerLinkContent?.classList?.add("content-container"); 

    if (customerLinkContent) {
    const paragraphs = customerLinkContent.querySelectorAll("p");
    paragraphs.forEach((p, idx) => {
        p.classList.add(`para-${idx}`); // ✔ correct template literal
    });
    }
}