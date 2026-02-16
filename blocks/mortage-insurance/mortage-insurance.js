(function decorateMortgageInsurance(block) {
  if (window.location.href.includes("author")) return;
  debugger;
  console.log('decorating mortage-insurance block');
  console.log(...block.allChildren);
  const children = [...block.allChildren];

  children.forEach((child) => {
    console.log(child);
  });
}(document.querySelector('.mortgage-insurance')));