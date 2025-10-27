export default function decorate(block) {
  // Select the <p> element inside the block
  const p = block.querySelector('p');
  if (!p) return;

  // Create a new div and give it a class
  const wrapper = document.createElement('div');
  wrapper.classList.add('questions-container');

  // Insert the new div right after the <p> tag
  p.insertAdjacentElement('afterend', wrapper);

  // Move all <ul> elements into the new div
  const uls = block.querySelectorAll('ul');
  uls.forEach((ul) => {
    wrapper.appendChild(ul);
  });
}
