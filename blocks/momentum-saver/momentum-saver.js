(function decorateMomentumSaver() {
  const allMomentumSections = document.querySelectorAll('.momentum-saver-section');

  allMomentumSections?.forEach((momentumSection) => {
    const momentumWrapper = momentumSection?.querySelector(".columns");
    momentumWrapper?.classList?.add("momentum-columns");

    const momentumWrapperImg = momentumSection?.querySelector(".momentum-image-saver .columns");
    momentumWrapperImg?.classList?.add("momentum-columns");

    const momentumWrapperImgSwap = momentumSection?.querySelector(".image-swapping .columns");
    momentumWrapperImgSwap?.classList?.add("momentum-columns");

    if (momentumSection?.classList?.contains("left-percentage-section")) {
      const momentumWrapperdiv = momentumSection.querySelector(".momentum-columns > div > div");
      momentumWrapperdiv?.classList?.add("momentum-content");
    }

    const momentumWrapperseconddiv = momentumSection?.querySelector(".momentum-columns > div > .momentum-content + div");
    momentumWrapperseconddiv?.classList?.add("momentum-second-content");

    if (momentumSection?.classList?.contains("momentum-image-saver")) {
      const momentumWrapperSecondDivSaver = momentumSection.querySelector(".columns-wrapper > .momentum-columns > div > div:not(.columns-img-col)");
      momentumWrapperSecondDivSaver?.classList?.add("momentum-second-content");

      if (momentumSection?.classList?.contains("image-swapping")) {
        const momentumWrapperSecondDivSaverSwap = momentumSection.querySelector(".columns-wrapper > .momentum-columns > div > div:not(.columns-img-col)");
        momentumWrapperSecondDivSaverSwap?.classList?.add("momentum-second-content");
      }
    }

    const secondContent = momentumSection.querySelector('.momentum-second-content');
    if (secondContent) {
      const buttonContainers = secondContent.querySelectorAll('.button-container');

      if (buttonContainers.length > 0) {
        const newButtonPara = document.createElement('p');
        newButtonPara.className = 'button-container';

        buttonContainers.forEach((container, index) => {
          const anchor = container.querySelector('a');
          if (anchor) {
            newButtonPara.appendChild(anchor);
          }

          if (index > 0) {
            container.remove();
          }
        });

        buttonContainers[0].replaceWith(newButtonPara);
      }
    }

    const isTeal = momentumSection?.classList?.contains("background-color-teal") && !momentumSection?.classList?.contains("momentum-image-saver");
    if (isTeal) {
      const varText = momentumSection.querySelector(".columns-wrapper > .momentum-columns");
      varText?.classList?.add("background-color-white");
    }

    const interestRateWrap = momentumSection?.querySelector('p:has(.interest-rate)');
    if (interestRateWrap) {
      const interestRate = interestRateWrap?.querySelector('.interest-rate');
      if (interestRate) {
        interestRateWrap.insertAdjacentHTML('afterend', interestRate.innerHTML);
        interestRateWrap.remove();
      }
    }
  });
}());
