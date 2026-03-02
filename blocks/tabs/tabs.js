import { button, div, p } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
  if (window.location.origin.includes('author')) return;

  const allPanels = document.querySelectorAll('.tabs-panel');
  const tabList = div({ class: 'tabs-list', role: 'tablist' });
  const tabPanels = div({ class: 'tabs-panels' });
  const currentPanelIds = [];

  [...block.children].forEach((tabItem, index) => {
    const tabTitle = tabItem.firstElementChild?.textContent;
    const tabId = tabItem.lastElementChild?.textContent;
    const tabButton = button({ class: 'tabs-tab', type: 'button', role: 'tab', id: `${tabId}--tab`, 'aria-controls': `${tabId}--panel`, 'aria-selected': index === 0 ? 'true' : 'false' }, p(tabTitle));

    currentPanelIds.push(`${tabId}--panel`);

    tabList.appendChild(tabButton);

    tabButton.addEventListener("click", () => {
      const tabPanel = document.getElementById(`${tabId}--panel`);

      tabPanels.querySelectorAll("[role=tabpanel]").forEach((panel) => {
        panel.setAttribute("aria-hidden", "true");
      });

      tabList.querySelectorAll("[role=tab]").forEach((btn) => {
        btn.setAttribute("aria-selected", "false");
      });

      tabPanel.setAttribute("aria-hidden", "false");
      tabButton.setAttribute("aria-selected", "true");
    });
  });

  allPanels.forEach((panel) => {
    if (!currentPanelIds?.includes(`${panel.id}--panel`)) return;

    panel.setAttribute('id', `${panel.id}--panel`);
    panel.setAttribute('aria-hidden', 'false');
    panel.setAttribute('aria-labelledby', `${panel.id}--tab`);
    panel.setAttribute('role', 'tabpanel');

    tabPanels.appendChild(panel);
  });

  block.innerHTML = '';

  const tabListWrapper = div({ class: 'tab-list-wrapper' }, tabList);
  block.appendChild(tabListWrapper);
  block.appendChild(tabPanels);

  tabList.children?.[0]?.dispatchEvent(new Event('click'));
}
