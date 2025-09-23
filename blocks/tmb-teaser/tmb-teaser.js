import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
    const teaserContent = document.querySelector(".default-content-wrapper");
    teaserContent.classList.add("momentum-teaser-wrapper");

    const ulClassname = document.querySelector(".momentum-teaser-wrapper ul");
    ulClassname.classList.add("momentum-listing-wrapper");

    const secondulClassname = document.querySelector(".momentum-teaser-wrapper").nextElementSibling;
    secondulClassname.classList.add("listing-wrapper");

}

