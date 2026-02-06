export default function decorateCalculator(block) {
  const [a, b] = block.children;
  const aValue = parseFloat(a.textContent);
  const bValue = parseFloat(b.textContent); 
  if (!isNaN(aValue) && !isNaN(bValue)) {
    const sum = aValue + bValue;
    const result = document.createElement('p');
    result.textContent = `Result: ${sum}`;
    block.appendChild(result);
  }
}
