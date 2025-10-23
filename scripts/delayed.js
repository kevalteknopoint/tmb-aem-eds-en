// add delayed functionality here
if (window.location.href.includes("/faq-detail")) {
  const mainClass = document.querySelector("main");
  console.log(mainClass);
  const secwrapper = mainClass.querySelector(".section-wrapper");
  const subsecwrapper = mainClass.querySelectorAll(".sub-section-wrapper");
  Array.from(subsecwrapper).forEach((e) => {
    secwrapper.append(e);
  });
}
