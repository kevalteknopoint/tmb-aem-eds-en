import {
  ol, li, div, h3,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const items = [...block.children];

  const getText = (cell, fallback = '') =>
    cell?.textContent?.trim() || fallback;

  const getLink = (cell) => cell?.querySelector('a');

  const list = ol({ class: 'stepper-list' });
  const stepItems = [];

  const setActiveStep = (activeIndex) => {
    stepItems.forEach((step, i) => {
      step.classList.toggle('is-active', i === activeIndex);
      step.classList.toggle('is-completed', i < activeIndex);
    });
  };

  items.forEach((item, index) => {
    const cells = [...item.children];

    // Exact model order
    const stepNumber = getText(cells[0]);
    const stepTitle = cells[1]?.innerHTML;
    const stepContent = cells[2]?.innerHTML;
    const stepTip = cells[3]?.innerHTML;

    const btn1Text = getText(cells[4]);
    const btn1Title = getText(cells[5]);
    const btn1Link = getLink(cells[6]);
    const btn1Target = getText(cells[7], '_self');
    const btn1Style = getText(cells[8], 'outlined');

    const btn2Text = getText(cells[9]);
    const btn2Title = getText(cells[10]);
    const btn2Link = getLink(cells[11]);
    const btn2Target = getText(cells[12], '_self');
    const btn2Style = getText(cells[13], 'outlined');

    const indicator = div(
      {
        class: 'stepper-indicator',
        role: 'button',
        tabindex: '0',
        'aria-label': `Activate step ${index + 1}`,
      },
      stepNumber || String(index + 1),
    );

    indicator.addEventListener('click', () => setActiveStep(index));
    indicator.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveStep(index);
      }
    });

    const body = div({ class: 'stepper-body' });

    if (stepTitle?.trim()) {
      body.append(h3({ class: 'stepper-title' }));
      body.lastElementChild.innerHTML = stepTitle;
    }

    const stepCollapse = div({ class: 'step-collapse' });

    if (stepContent?.trim()) {
      const content = div({ class: 'stepper-content' });
      content.innerHTML = stepContent;
      stepCollapse.append(content);
    }

    if (stepTip?.trim()) {
      const tip = div({ class: 'stepper-tip' });
      tip.innerHTML = stepTip;
      stepCollapse.append(tip);
    }

    const actions = div({ class: 'stepper-actions' });

    if (btn1Link && btn1Text) {
      btn1Link.textContent = btn1Text;
      btn1Link.title = btn1Title || btn1Text;
      btn1Link.target = btn1Target;
      btn1Link.className = `button ${btn1Style}`;
      actions.append(btn1Link);
    }

    if (btn2Link && btn2Text) {
      btn2Link.textContent = btn2Text;
      btn2Link.title = btn2Title || btn2Text;
      btn2Link.target = btn2Target;
      btn2Link.className = `button ${btn2Style}`;
      actions.append(btn2Link);
    }

    if (actions.children.length) {
      stepCollapse.append(actions);
    }

    body.append(stepCollapse);

    const stepItem = li(
      { class: 'stepper-item' },
      indicator,
      body,
    );

    stepItems.push(stepItem);
    list.append(stepItem);
  });

  block.replaceChildren(list);

  // Initial state
  setActiveStep(0);
}
