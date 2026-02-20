export default function decorate(block) {
  console.log('Decorating Embed Iframe block');
  const link = block.querySelector('a');
  if (!link) return;

  // Object destructuring
  const { href } = link;

  const isYouTube = href.includes('youtube.com') || href.includes('youtu.be');

  if (isYouTube) {
    const url = new URL(href);
    // Destructuring searchParams to get the 'v' variable
    const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();

    block.innerHTML = `
      <div class="video-wrapper">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>`;
  }
}
