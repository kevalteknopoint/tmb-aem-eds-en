export default function decorate(block) {
  const link = block.querySelector("a");
  if (!link) return;

  const { href } = link;

  block.innerHTML = `
      <div class="video-wrapper">
        <iframe 
          src="${href}"
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>`;
}
