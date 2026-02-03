export default function decorateOnlineBanking(block) {
  const cardsUl = block.querySelector(".cards ul");
  if (!cardsUl) return;

  cardsUl.classList.add("banking-cards-ul");

  block.querySelectorAll(".banking-cards-ul > li").forEach((li, idx) => {
    li.classList.add(`banking-li-${idx + 1}`);

    // 1. Identify the parts
    const imageDiv = li.querySelector(".cards-card-image");
    const bodies = Array.from(li.querySelectorAll(".cards-card-body"));
    if (bodies.length === 0) return;

    const mainBody = bodies[0];

    // Consolidate fragmented bodies (Standard cleanup)
    bodies.slice(1).forEach((extraBody) => {
      while (extraBody.firstChild) {
        mainBody.appendChild(extraBody.firstChild);
      }
      extraBody.remove();
    });

    // 2. Logic: If there is an image, we apply the "card-bottom" wrapper structure
    // This allows the text-only card to remain as a standard body.
    if (imageDiv) {
      const heading = mainBody.querySelector("h1, h2, h3, h4, h5, h6");
      // Select all paragraphs that aren't the button container
      const description = mainBody.querySelector("p:not(.button-container)");
      const allLinks = Array.from(mainBody.querySelectorAll("a"));

      // Create Top Container
      const topContainer = document.createElement("div");
      topContainer.className = "card-bottom-1";

      if (heading) {
        const h2 = document.createElement("h2");
        h2.className = "banking-desc-1";
        h2.textContent = heading.textContent.trim();
        topContainer.appendChild(h2);
      }

      if (description) {
        const pDesc = document.createElement("p");
        pDesc.textContent = description.textContent.trim();
        topContainer.appendChild(pDesc);
      }

      // Create Bottom Container
      const bottomContainer = document.createElement("div");
      bottomContainer.className = "card-bottom-2";
      const pButtons = document.createElement("p");

      allLinks.forEach((link) => {
        // If it doesn't already have an icon, it's likely a standard button
        if (!link.querySelector(".icon")) {
          link.className = "button";
        }
        pButtons.appendChild(link);
      });

      // Clear and Rebuild
      mainBody.innerHTML = "";
      mainBody.appendChild(topContainer);

      if (pButtons.hasChildNodes()) {
        bottomContainer.appendChild(pButtons);
        mainBody.appendChild(bottomContainer);
      }

      // if(bottomContainer){
      //   const iconDetails = bottomContainer.querySelectorAll(".card-bottom-2 p a");
      //   console.log(iconDetails);
      //   if(iconDetails.0.childNodes.length == 1 && $0.querySelector('.icon')){
      //     console.log('icon present');
      //   }
      // }

      const bottomContainers = li.querySelector(".card-bottom-2");
      if (bottomContainers) {
        const links = Array.from(bottomContainers.querySelectorAll("a"));

        // Check if any of the links have actual text words
        const hasText = links.some(
          (link) => link.textContent.trim().length > 0,
        );

        if (!hasText) {
          // Scenario: App Badges (No text, just icons)
          bottomContainers.classList.add("is-badge-link");
        } else {
          // Scenario: Text Buttons (Contains "Find out how", etc.)
          bottomContainers.classList.add("is-button-link");
        }
      }
    } else {
      // 3. This is the "Text Only" card (No imageDiv found)
      // Add a specific class for styling if needed
      li.classList.add("text-only-card");

      // Ensure the heading is styled correctly for the text card
      const textHeading = mainBody.querySelector("h2");
      if (textHeading) textHeading.id = "how-can-we-help";
    }

    // Cleanup
    li.querySelectorAll("div:empty").forEach((empty) => empty.remove());
  });
}
