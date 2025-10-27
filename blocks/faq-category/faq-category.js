export default function decorate(block) {
  // Create a new div element
  const wrapper = document.createElement('div');
  wrapper.classList.add('questions-wrapper'); // Add your desired class name

  // Select all <ul> elements inside the block
  const uls = block.querySelectorAll('ul');

  // Move all <ul> elements into the wrapper
  uls.forEach((ul) => {
    wrapper.appendChild(ul);
  });

  // Insert the wrapper into the DOM
  block.appendChild(wrapper);
}
