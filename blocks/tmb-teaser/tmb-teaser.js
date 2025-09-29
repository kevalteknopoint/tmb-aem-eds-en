import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
    const teaserContent = document.querySelector(".momentum-section .default-content-wrapper");
    teaserContent.classList.add("momentum-teaser-wrapper");

    const ulClassname = document.querySelector(".momentum-teaser-wrapper ul");
    ulClassname.classList.add("momentum-listing-wrapper");

    const secondulClassname = document.querySelector(".momentum-teaser-wrapper").nextElementSibling;
    secondulClassname.classList.add("listing-wrapper");

    // const tmbTeaser = document.querySelector(".momentum-block div").nextElementSibling;
    // tmbTeaser.classList.add("tmb-teaser-content");

    document.querySelectorAll('.momentum-section  .momentum-block div:nth-child(2) div')
    .forEach((div, idx) => {
      div.classList.add(`banking-desc-${idx + 1}`);
    });
}

