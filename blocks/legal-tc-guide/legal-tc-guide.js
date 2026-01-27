(function decorateLegalTcGuide() {
  // 1. Target the component block
  const block = document.querySelector('.legal-tc-guide');
  if (!block) return;

  // 2. Find all buttons within this specific block
  const allButtons = block.querySelectorAll('.button-container a.button');

  // 3. Find the first button container paragraph to act as the "Master"
  const masterContainer = block.querySelector('.button-container');

  if (allButtons.length > 1 && masterContainer) {
    // 4. Clear the master container completely
    // This removes the <strong> tag while keeping the master <p>
    masterContainer.innerHTML = '';

    // 5. Move every button found directly into the master <p>
    allButtons.forEach((button) => {
      masterContainer.appendChild(button);
    });

    // 6. Remove any now-empty button-containers left behind
    const allContainers = block.querySelectorAll('.button-container');
    allContainers.forEach((container, index) => {
      if (index > 0) { // Keep only the first one
        container.remove();
      }
    });
  }
}());
