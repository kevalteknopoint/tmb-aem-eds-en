import decorateFaqBanner from "./faq-banner.js";

export default function decorate(block) {
  if (block.closest('.faq-landing-banner')) {
    decorateFaqBanner(block);
  } else {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);

    // setup image columns
    [...block.children].forEach((row) => {
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            // picture is only content in column
            picWrapper.classList.add('columns-img-col');
          }
        }
      });
    });
  }
}
