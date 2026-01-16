(function decorateLegalTcGuide() {
    console.log("legal");
    // 1. Target the component block
    const block = document.querySelector('.legal-tc-guide');
    if (!block) return;

    // 2. Find all buttons within this specific block
    const allButtons = block.querySelectorAll('.button-container a.button');
    
    // 3. Find the first button container to act as the "Master" container
    const masterContainer = block.querySelector('.button-container');

    if (allButtons.length > 1 && masterContainer) {
        // 4. Clear the master container of any wrappers like <strong> or <em>
        // but keep existing text if necessary, or just empty it for the buttons
        masterContainer.innerHTML = '';

        // 5. Move every button found into the master container
        allButtons.forEach(button => {
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
})();