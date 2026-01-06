import decorateFaqBanner from "./faq-banner.js";
import decorateWhoCanApply from "./who-can-apply.js";
import decorateCustomer from "./customer.js";
import decorateMoneyOverseas from "./money-overseas.js";

export default function decorate(block) {
  if (block.closest('.faq-landing-banner')) {
    decorateFaqBanner(block);
  } else if (block.closest('.who-can-apply-section')) {
    decorateWhoCanApply(block);
  } else if (block.closest('.customer')) {
    decorateCustomer(block);
  } else if (block.closest('.money-overseas')) {
    decorateMoneyOverseas(block);
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
