import { toClassName } from "../../scripts/aem.js";
import { div } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
  if (window.location.origin.includes('author')) return;

  // build tablist
  const tablist = document.createElement("div");
  tablist.className = "tabs-list";
  tablist.setAttribute("role", "tablist");

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);

  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = `tabs-panel panel${i + 1}`;
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    tabpanel.setAttribute("aria-labelledby", `tab-${id}`);
    tabpanel.setAttribute("role", "tabpanel");

    requestAnimationFrame(() => {
      const panels = block.querySelectorAll(".tabs-panel");

      panels.forEach((panel) => {
        const innerDiv = panel.querySelector(":scope > div");
        if (!innerDiv) return;

        panel.classList.forEach((cls) => {
          if (cls !== "tabs-panel") {
            innerDiv.classList.add(cls);
          }
        });
      });
    });

    // build tab button
    const button = document.createElement("button");
    button.className = "tabs-tab";
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute("aria-controls", `tabpanel-${id}`);
    button.setAttribute("aria-selected", i === 0 ? "true" : "false");
    button.setAttribute("role", "tab");
    button.setAttribute("type", "button");

    button.addEventListener("click", () => {
      block.querySelectorAll("[role=tabpanel]").forEach((panel) => {
        panel.setAttribute("aria-hidden", "true");
      });

      tablist.querySelectorAll("[role=tab]").forEach((btn) => {
        btn.setAttribute("aria-selected", "false");
      });

      tabpanel.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-selected", "true");
    });

    tablist.append(button);
    tab.remove();
  });

  block.prepend(div({ class: 'tab-list-wrapper' }, tablist));
}
