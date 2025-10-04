export default function decorate(block) {
  const bgImage = block.dataset.bgImage;
  const heading = block.dataset.heading || "";
  const listItems = block.dataset.listItems || "";

  // Create container div
  const container = document.createElement("div");
  container.className = "banking-good";
  if (bgImage) {
    container.style.backgroundImage = `url('${bgImage}')`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
  }

  // Add heading
  const h3 = document.createElement("h3");
  h3.textContent = heading;
  container.appendChild(h3);

  // Add list
  const ul = document.createElement("ul");
  ul.innerHTML = listItems; // richtext will allow <li> and <a>
  container.appendChild(ul);

  // Replace block content
  block.textContent = "";
  block.appendChild(container);
}
