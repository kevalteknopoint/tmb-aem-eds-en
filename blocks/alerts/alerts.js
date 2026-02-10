export default function decorate(block) {
  if (window.location.href.includes('author')) return;

  [...block.children].forEach((row) => {
    const inner = row.firstElementChild;
    if (!inner) return;

    const children = [...inner.children];
    if (!children.length) return;

    // first <p> = icon
    const icon = children[0];

    // create wrappers
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'alert-icon';

    const textWrapper = document.createElement('div');
    textWrapper.className = 'alert-text';

    // move icon
    iconWrapper.append(icon);

    // move rest
    children.slice(1).forEach((el) => textWrapper.append(el));

    // clear and append inside inner
    inner.textContent = '';
    inner.append(iconWrapper, textWrapper);

    row.append(iconWrapper, textWrapper);
    inner.remove();
  });
}
