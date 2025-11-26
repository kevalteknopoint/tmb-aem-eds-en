import decorateFaqBanner from "./faq-banner.js";
import decorateInterestRates from "./interest-rates.js";

export default function decorate(block) {
  if (block.closest('.faq-landing-banner')) {
    decorateFaqBanner(block);
  } else if (
  block.closest('.interest-rates-section') ||
  block.closest('.interest-rate-border')
) {
    decorateInterestRates(block);
}else {
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
