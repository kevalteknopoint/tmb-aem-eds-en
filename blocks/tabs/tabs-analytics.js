import {
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  sideNavMenuClick
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const tab = e.target.closest('.tabbed-navigation.tabs-container .tabs-tab');
  if (!tab) return;

  // const container = tab.closest('.tabbed-navigation');

  // Level 1 menu (clicked tab text)
  const leveloneMenu = minifyText(
    tab.querySelector('p')?.textContent
  );

  // No level 2 in tabs
  const leveltwoMenu = '';
  const pageRegion = getPageRegion(tab);
  const componentIndex = getComponentIndex(tab);
  const componentPersona = getPersona();
  const sectionEl = tab.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || '';
  sideNavMenuClick(
    pageRegion,
    leveloneMenu,
    leveltwoMenu,
    'tabs navigation',
    'tabs',
    componentIndex,
    componentPersona,
    '',
    'cta-link',
    'internal',
    componentId
  );
});
