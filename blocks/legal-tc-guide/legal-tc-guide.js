(function decorateLegalTcGuide() {
    // 1. Target the component block
    const block = document.querySelector('.legal-tc-guide');
    if (!block) return;

    // 2. Find all buttons within this specific block
    const allButtons = block.querySelectorAll('.button-container a.button');
    console.log(`le  ${allButtons}`);
    
    // 3. Find the first button container to act as the "Master" container
    const masterContainer = block.querySelector('.button-container');

    console.log(`le  ${masterContainer}`);

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



// (function decorateLegalTcGuide() {
//     // Select the block - in EDS this usually matches the class of the block
//     const block = document.querySelector('.legal-tc-guide');
//     if (!block) return;

//     // Find all links that were authored in the Universal Editor
//     const allButtons = block.querySelectorAll('a');
//     const firstPara = block.querySelector('.button-container');

//     if (allButtons.length > 0 && firstPara) {
//         // Ensure we have a strong tag as requested
//         let masterWrapper = firstPara.querySelector('strong');
//         if (!masterWrapper) {
//             masterWrapper = document.createElement('strong');
//             // Move buttons into the new strong tag
//             firstPara.innerHTML = ''; 
//             firstPara.appendChild(masterWrapper);
//         }

//         const iconHTML = `<span class="icon icon-download-icon">
//             <svg class="icon-svg"><use href="#download-icon"></use></svg>
//         </span>`;

//         // Clear and rebuild to ensure exact structure
//         masterWrapper.innerHTML = '';

//         allButtons.forEach(button => {
//             button.classList.add('button'); // Ensure class consistency
//             // Inject icon if it's missing from the editor output
//             if (!button.querySelector('.icon')) {
//                 button.insertAdjacentHTML('beforeend', iconHTML);
//             }
//             masterWrapper.appendChild(button);
//         });

//         // Clean up empty paragraphs authored in the editor
//         const extraParas = block.querySelectorAll('.button-container');
//         extraParas.forEach((p, i) => { if (i > 0) p.remove(); });
//     }
// })();


(function decorateLegalTcGuide() {
    console.log("inso");
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