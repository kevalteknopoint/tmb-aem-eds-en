export default function decorateProductNavigation() {
  const productNav = document.querySelector('.product-navigation');

  if (!productNav) return;

  const allLinks = productNav?.querySelectorAll('ul a');
  const allContainers = Array.from(allLinks).map((link) => {
    if (!link.getAttribute('href').startsWith('#')) return document.createElement('div');

    const linkedContainer = document.querySelector(`${link.getAttribute('href')}-scroll`);

    link.addEventListener('click', (e) => {
      e.preventDefault();

      window.scrollTo({
        top: (linkedContainer.offsetTop - 120),
        behavior: 'smooth'
      });
    });

    return linkedContainer || document.createElement('div');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        allLinks.forEach((link) => link.classList.remove('active'));

        const entryId = entry.target.getAttribute('id')?.replace('-scroll', '');

        if (!entryId) return;

        const entryLink = document.querySelector(`a[href="#${entryId}"]`);

        entryLink?.classList.add('active');
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '0px 0px -20% 0px'
  });

  allContainers.forEach((con) => observer.observe(con));
}
