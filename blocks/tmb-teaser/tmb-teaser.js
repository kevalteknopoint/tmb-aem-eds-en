// export default function decorate() {
//   /* change to ul, li */
//   const teaserContent = document.querySelector(".momentum-section .default-content-wrapper");
//   teaserContent.classList.add("momentum-teaser-wrapper");

//   const ulClassname = document.querySelector(".momentum-teaser-wrapper ul");
//   ulClassname.classList.add("momentum-listing-wrapper");

//   // const secondulClassname = document.querySelector(".momentum-teaser-wrapper").nextElementSibling;
//   // secondulClassname.classList.add("listing-wrapper");

//   const tmbTeaser = document.querySelector(".momentum-block div");
//   tmbTeaser.classList.add("tmb-teaser-content");

//   const teaserCont = document.querySelector(".momentum-block div:nth-child(2)");
//   teaserCont.classList.add("teaser-content");

//   const momentumWrapper = document.querySelector(".momentum-saver-section .columns");
//   momentumWrapper.classList.add("momentum-columns");
//   const momentumWrapperdiv = document.querySelector(".momentum-saver-section  .momentum-columns > div > div");
//   momentumWrapperdiv.classList.add("momentum-content");
//    const momentumWrapperseconddiv = document.querySelector(".momentum-saver-section  .momentum-columns > div > .momentum-content + div");
//     momentumWrapperseconddiv.classList.add("momentum-second-content");
//   // document.querySelectorAll('.momentum-section  .momentum-block div:nth-child(2) div')
//   // .forEach((div, idx) => {
//   //   div.classList.add(`banking-desc-${idx + 1}`);
//   // });
// }
export default function decorate() {
  /* change to ul, li */
  const teaserContent = document.querySelector(".momentum-section .default-content-wrapper");
  teaserContent.classList.add("momentum-teaser-wrapper");

  const ulClassname = document.querySelector(".momentum-teaser-wrapper ul");
  ulClassname.classList.add("momentum-listing-wrapper");

  const tmbTeaser = document.querySelector(".momentum-block div");
  tmbTeaser.classList.add("tmb-teaser-content");

  const teaserCont = document.querySelector(".momentum-block div:nth-child(2)");
  teaserCont.classList.add("teaser-content");

  const momentumWrapper = document.querySelector(".momentum-saver-section .columns");
  momentumWrapper.classList.add("momentum-columns");

  const momentumWrapperdiv = document.querySelector(".momentum-saver-section .momentum-columns > div > div");
  momentumWrapperdiv.classList.add("momentum-content");

  const momentumWrapperseconddiv = document.querySelector(".momentum-saver-section .momentum-columns > div > .momentum-content + div");
  momentumWrapperseconddiv.classList.add("momentum-second-content");

  // 🔹 Add "% p.a" to all h2 elements inside momentum-content
// Add a separate "% p.a" element after each h2 inside .momentum-content
document.querySelectorAll(".momentum-content h2").forEach((heading) => {
  // Prevent duplication
  if (heading.nextElementSibling && heading.nextElementSibling.classList.contains("rate-unit")) {
    return;
  }

  // Create the wrapper for % and P.A.
  const unitWrapper = document.createElement("div");
  unitWrapper.className = "rate-unit";

  // Create the % span
  const percentSpan = document.createElement("span");
  percentSpan.className = "rate-percent";
  percentSpan.textContent = "%";

  // Create the P.A. span
  const paSpan = document.createElement("span");
  paSpan.className = "rate-pa";
  paSpan.textContent = "p.a.";

  // Append spans into the wrapper
  unitWrapper.appendChild(percentSpan);
  unitWrapper.appendChild(paSpan);

  // Insert wrapper after the <h2>
  heading.insertAdjacentElement("afterend", unitWrapper);
});


}
