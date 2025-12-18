import { div, source, video } from "../../scripts/dom-helpers.js";

const videoRegex = /\.(mp4|mov|wmv|avi|mkv|flv|webm|mpeg|mpg|m4v|3gp|3g2|ogv|ts|m2ts|mts)(\?.*)?$/i;

export default function decorate(block) {
  if (window.location.href.includes('author')) return;

  const rows = [...block.children];

  const parts = {
    desktop: null,
    mobile: null,
    content: null,
    buttons: [],
  };

  rows.forEach((row) => {
    const roleCell = row.children[0];
    const role = roleCell?.textContent?.trim();

    roleCell?.remove();

    switch (role) {
      case "desktop-asset":
        parts.desktop = row;
        break;

      case "mobile-asset":
        parts.mobile = row;
        break;

      case "content":
        parts.content = row;
        break;

      case "button":
        parts.buttons.push(row);
        break;

      default:
        console.warn("Hero banner: unknown role", role, row);
    }
  });

  block.innerHTML = "";

  if (parts.desktop) {
    const mediaCell = parts.desktop.children[0];
    const altText = parts.desktop.children[1]?.textContent?.trim();

    if (mediaCell?.querySelector("a") && videoRegex.test(mediaCell.querySelector("a").href)) {
      const videoBlock = video(
        { autoplay: "", loop: "", muted: "", playsinline: "" },
        source({ src: mediaCell.querySelector("a").href })
      );
      mediaCell.innerHTML = "";
      mediaCell.appendChild(videoBlock);
    } else if (mediaCell?.querySelector("img")) {
      mediaCell.querySelector("img").alt = altText || "";
    }

    parts.desktop.classList.add("hero-banner-desktop-asset");
    parts.desktop.children[1]?.remove(); // remove alt cell
    block.appendChild(parts.desktop);
  }

  if (parts.mobile) {
    const mediaCell = parts.mobile.children[0];
    const altText = parts.mobile.children[1]?.textContent?.trim();

    if (mediaCell?.querySelector("a") && videoRegex.test(mediaCell.querySelector("a").href)) {
      const videoBlock = video(
        { autoplay: "", loop: "", muted: "", playsinline: "" },
        source({ src: mediaCell.querySelector("a").href })
      );
      mediaCell.innerHTML = "";
      mediaCell.appendChild(videoBlock);
    } else if (mediaCell?.querySelector("img")) {
      mediaCell.querySelector("img").alt = altText || "";
    }

    parts.mobile.classList.add("hero-banner-mobile-asset");
    parts.mobile.children[1]?.remove();
    block.appendChild(parts.mobile);
  }

  let contentInner = null;

  if (parts.content) {
    parts.content.classList.add("hero-banner-content-wrap");
    [contentInner] = parts.content.children;
    contentInner.classList.add("hero-banner-content");
    block.appendChild(parts.content);
  }

  if (contentInner && parts.buttons.length) {
    const buttonsWrap = div({ class: "hero-banner-buttons-wrap" });

    parts.buttons.forEach((row) => {
      const cells = [...row.children];

      const textCell = cells[0]?.querySelector('p') || cells[0];
      const text = textCell?.innerHTML?.trim();
      const link = cells[1]?.querySelector("a")?.href || cells[1]?.textContent?.trim();
      const style = cells[2]?.textContent?.trim() || "primary";
      const target = cells[3]?.textContent?.trim() || "_self";

      if (!text || !link) return;

      const a = document.createElement("a");
      a.href = link;
      a.innerHTML = text;
      a.className = `button ${style}`;
      a.target = target;

      buttonsWrap.appendChild(a);
    });

    contentInner.appendChild(buttonsWrap);
  }
}
