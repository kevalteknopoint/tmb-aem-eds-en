export default function decorate(block) {
  if (window.location.href.includes("author")) return;
  debugger;
  console.log('decorating mortage-insurance block');
  console.log(...block.children);
}
