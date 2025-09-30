export default async function decorate(block) {
  const items = block.querySelectorAll('.quick-links > div > div');

  items.forEach((item) => {
    const heading = item.querySelector('p');
    const ul = item.querySelector('ul');
    const icon = heading.querySelector('.icon-Flyout-menu-icon img');

    if (!heading || !ul) return;

    heading.style.cursor = 'pointer';

    heading.addEventListener('click', () => {
      const isActive = ul.classList.contains('active');
      items.forEach((other) => {
        const otherUl = other.querySelector('ul');
        const otherIcon = other.querySelector('.icon-Flyout-menu-icon img');
        if (otherUl) otherUl.classList.remove('active');
      });

      if (!isActive) {
        const allLists = block?.closest('.quick-links-container').querySelectorAll('ul');
        allLists.forEach(item => item.classList.remove('active'));
        ul.classList.add('active');
      }
    });
  });
}

