export default function decorateMomentumSaver() {
  // const teaserContent = document.querySelector(".momentum-section .default-content-wrapper");
  // teaserContent?.classList?.add("momentum-teaser-wrapper");

  // const ulClassname = document.querySelector(".momentum-teaser-wrapper ul");
  // ulClassname?.classList?.add("momentum-listing-wrapper");

  // const tmbTeaser = document.querySelector(".momentum-block div");
  // tmbTeaser?.classList?.add("tmb-teaser-content");

  // const teaserCont = document.querySelector(".momentum-block div:nth-child(2)");
  // teaserCont?.classList?.add("teaser-content");

  const momentumWrapper = document.querySelector(".momentum-saver-section .columns");
  momentumWrapper?.classList?.add("momentum-columns");

  const momentumWrapperImg = document.querySelector(".momentum-image-saver .columns");
  momentumWrapperImg?.classList?.add("momentum-columns");

  const momentumWrapperImgSwap = document.querySelector(".image-swapping .columns");
  momentumWrapperImgSwap?.classList?.add("momentum-columns");

  const momentumWrapperdiv = document.querySelector(".momentum-saver-section.left-percentage-section .momentum-columns > div > div");
  momentumWrapperdiv?.classList?.add("momentum-content");

  const momentumWrapperseconddiv = document.querySelector(".momentum-saver-section .momentum-columns > div > .momentum-content + div");
  momentumWrapperseconddiv?.classList?.add("momentum-second-content");

  const momentumWrapperSecondDivSaver = document.querySelector(".momentum-saver-section.momentum-image-saver > .columns-wrapper > .momentum-columns > div > div:nth-child(2)");
  momentumWrapperSecondDivSaver?.classList?.add("momentum-second-content");

  const momentumWrapperSecondDivSaverSwap = document.querySelector(".momentum-saver-section.momentum-image-saver.image-swapping > .columns-wrapper > .momentum-columns > div > div:nth-child(2)");
  momentumWrapperSecondDivSaverSwap?.classList?.add("momentum-second-content");

  const variantText = document.querySelector(".momentum-saver-section.background-color-teal");
  if (variantText) {
    const varText = document.querySelector(".momentum-saver-section.background-color-teal > .columns-wrapper > .momentum-columns");
    varText?.classList?.add("background-color-white");
  }

  // 🔹 Add "% p.a" to all h2 elements inside momentum-content
  // Add a separate "% p.a" element after each h2 inside .momentum-content
  const interestRateWrap = document.querySelector('p:has(.interest-rate)');
  if (!interestRateWrap) return;

  const interestRate = interestRateWrap?.querySelector('.interest-rate');

  if (!interestRate) return;

  interestRateWrap.insertAdjacentHTML('afterend', interestRate.innerHTML);
  interestRateWrap.remove();
}
