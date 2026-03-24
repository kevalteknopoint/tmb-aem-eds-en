export default function decorate(block) {
  const link = block.querySelector("a");
  if (!link) return;

  let { href } = link;


  if (href.includes('?')) {
    // Avoid duplicating param
    if (!/([?&])enablejsapi=1/.test(href)) {
      href += '&enablejsapi=1';
    }
  } else {
    href += '?enablejsapi=1';
  }

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