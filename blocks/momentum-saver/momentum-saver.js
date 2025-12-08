export default function decorateMomentumSaver() {
  const allMomentumSections = document.querySelectorAll('.momentum-saver-section');

  allMomentumSections?.forEach((momentumSection) => {
    const momentumWrapper = momentumSection?.querySelector("& .columns");
    momentumWrapper?.classList?.add("momentum-columns");

    const momentumWrapperImg = momentumSection?.querySelector(".momentum-image-saver .columns");
    momentumWrapperImg?.classList?.add("momentum-columns");

    const momentumWrapperImgSwap = momentumSection?.querySelector(".image-swapping .columns");
    momentumWrapperImgSwap?.classList?.add("momentum-columns");

    const momentumWrapperdiv = momentumSection?.querySelector("&.left-percentage-section .momentum-columns > div > div");
    momentumWrapperdiv?.classList?.add("momentum-content");

    const momentumWrapperseconddiv = momentumSection?.querySelector("& .momentum-columns > div > .momentum-content + div");
    momentumWrapperseconddiv?.classList?.add("momentum-second-content");

    const momentumWrapperSecondDivSaver = momentumSection?.querySelector("&.momentum-image-saver > .columns-wrapper > .momentum-columns > div > div:nth-child(2)");
    momentumWrapperSecondDivSaver?.classList?.add("momentum-second-content");

    const momentumWrapperSecondDivSaverSwap = momentumSection?.querySelector("&.momentum-image-saver.image-swapping > .columns-wrapper > .momentum-columns > div > div:nth-child(2)");
    momentumWrapperSecondDivSaverSwap?.classList?.add("momentum-second-content");

    const variantText = momentumSection?.querySelector("&.background-color-teal");
    if (variantText) {
      const varText = momentumSection?.querySelector("&.background-color-teal > .columns-wrapper > .momentum-columns");
      varText?.classList?.add("background-color-white");
    }

    const interestRateWrap = momentumSection?.querySelector('& p:has(.interest-rate)');
    if (!interestRateWrap) return;

    const interestRate = interestRateWrap?.querySelector('.interest-rate');

    if (!interestRate) return;

    interestRateWrap.insertAdjacentHTML('afterend', interestRate.innerHTML);
    interestRateWrap.remove();
  });
}
