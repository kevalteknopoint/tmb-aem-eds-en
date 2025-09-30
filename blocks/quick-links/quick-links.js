// export default async function decorate(block) {
//   const icons = block.querySelectorAll(
//     ".quick-links-wrapper > .quick-links > div > div > p > .icon:last-child > img"
//   );
//   icons.forEach((icon) => {
//     icon.style.cursor = "pointer";
//     icon.addEventListener("click", (e) => {
//       e.stopPropagation();
//       const heading = icon.closest("p");
//       if (!heading) return;
//       const ul = heading.nextElementSibling;
//       if (ul && ul.tagName === "UL") {
//         ul.classList.toggle("active");
//         if (icon.style.transform === "rotate(180deg)") {
//             icon.style.transform = "rotate(0deg)";
//         } else {
//             icon.style.transform = "rotate(180deg)";
//         }
//         icon.style.transition = "transform 0.1s ease";
//       }
//     });
//   });



// working as expected
export default async function decorate(block) {
  const icons = block.querySelectorAll(
    ".quick-links-wrapper > .quick-links > div > div > p > .icon:last-child > img"
  );

  // 🔹 STEP 0: Page load pe sab ul close karo aur icons reset karo
  block.querySelectorAll(".quick-links-wrapper ul").forEach((ul) => {
    ul.classList.remove("active");
    const icon = ul.previousElementSibling.querySelector(".icon:last-child > img");
    if (icon) icon.style.transform = "rotate(0deg)";
  });

  icons.forEach((icon) => {
    icon.style.cursor = "pointer";

    icon.addEventListener("click", (e) => {
      e.stopPropagation();

      const heading = icon.closest("p");
      if (!heading) return;

      const ul = heading.nextElementSibling;
      if (!ul || ul.tagName !== "UL") return;

      const isActive = ul.classList.contains("active");

      document.querySelectorAll(".quick-links-wrapper ul").forEach((otherUl) => {
        otherUl.classList.remove("active");
        const otherIcon = otherUl.previousElementSibling.querySelector(".icon:last-child > img");
        if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
      });

      // 🔵 Toggle clicked ul only if it was not active
      if (!isActive) {
        ul.classList.add("active");
        icon.style.transform = "rotate(180deg)";
      }

      icon.style.transition = "transform 0.1s ease";
    });
  });
}




// export default async function decorate(block) {
//   // 🔹 STEP 0: Close all ULs and reset icons
//   const allUls = block.querySelectorAll(".quick-links-wrapper ul");
//   allUls.forEach(ul => {
//     ul.classList.remove("active");
//     const icon = ul.previousElementSibling?.querySelector(".icon:last-child > img");
//     if (icon) {
//       icon.style.transform = "rotate(0deg)";
//       icon.style.transition = "transform 0.1s ease";
//     }
//   });

//   // 🔹 Function to toggle a UL for a given <p>
//   function toggleUl(p) {
//     const ul = p.nextElementSibling; // UL should be immediately after <p>
//     if (!ul || ul.tagName !== "UL") return;

//     const isActive = ul.classList.contains("active");

//     // 🔴 Close all other ULs
//     allUls.forEach(otherUl => {
//       if (otherUl !== ul) { // leave current UL alone
//         otherUl.classList.remove("active");
//         const otherIcon = otherUl.previousElementSibling?.querySelector(".icon:last-child > img");
//         if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
//       }
//     });

//     // 🔵 Toggle clicked UL
//     if (isActive) {
//       ul.classList.remove("active");
//       const icon = p.querySelector(".icon:last-child > img");
//       if (icon) icon.style.transform = "rotate(0deg)";
//     } else {
//       ul.classList.add("active");
//       const icon = p.querySelector(".icon:last-child > img");
//       if (icon) icon.style.transform = "rotate(180deg)";
//     }
//   }

//   // 🔹 Attach click listener to all <p> in the block
//   const headings = block.querySelectorAll(".quick-links-wrapper p");
//   headings.forEach(p => {
//     p.style.cursor = "pointer";
//     p.addEventListener("click", e => {
//       e.stopPropagation();
//       toggleUl(p);
//     });
//   });
// }

