/* eslint-disable no-param-reassign */
import {
  div,
  p,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const getRow = (i) => rows[i]?.firstElementChild || null;

  const imageRow = getRow(0)?.querySelector('picture');
  const imageAltRow = getRow(1)?.querySelector('p');
  const contentRow = getRow(2);
  const quoteRow = getRow(3)?.querySelector('p');
  const authorImageRow = getRow(4)?.querySelector('picture');
  const authorNameRow = getRow(6)?.querySelector('p');
  const authorProfessionRow = getRow(7)?.querySelector('p');
  const authorExtraRow = getRow(8)?.querySelector('p');

  const btn1TextRow = getRow(9)?.querySelector('p');
  const btn1LinkRow = getRow(11)?.querySelector('a');
  const btn1TargetRow = getRow(12)?.querySelector('p');
  const btn1StyleRow = getRow(13)?.querySelector('p');

  const btn2TextRow = getRow(14)?.querySelector('p');
  const btn2LinkRow = getRow(16)?.querySelector('a');
  const btn2TargetRow = getRow(17)?.querySelector('p');
  const btn2StyleRow = getRow(18)?.querySelector('p');

  block.textContent = '';

  const reversed = block.classList.contains('quote-reversed-content');

  let imageCol = null;

  if (imageRow) {
    if (imageAltRow && imageRow.querySelector('img')) {
      imageRow.querySelector('img').alt = imageAltRow.textContent.trim();
    }

    imageCol = div(
      { class: 'card-with-quote-image' },
      imageRow,
    );
  }

  const contentCol = div({ class: 'card-with-quote-content' });

  if (contentRow) {
    contentCol.append(contentRow);
  }

  if (quoteRow && quoteRow.textContent.trim()) {
    const quoteWrapper = div(
      { class: 'card-with-quote-quote' },
      p({ class: 'card-with-quote-quote-text' }, quoteRow.textContent.trim()),
    );

    const authorMeta = div({ class: 'card-with-quote-author' });

    if (authorImageRow) {
      authorMeta.append(
        div({ class: 'card-with-quote-author-image' }, authorImageRow),
      );
    }

    const authorInfo = div({ class: 'card-with-quote-author-info' });

    if (authorNameRow?.textContent.trim()) {
      authorInfo.append(
        p({ class: 'card-with-quote-author-name' }, authorNameRow.textContent.trim()),
      );
    }

    if (authorProfessionRow?.textContent.trim()) {
      authorInfo.append(
        p(
          { class: 'card-with-quote-author-profession' },
          authorProfessionRow.textContent.trim(),
        ),
      );
    }

    if (authorExtraRow?.textContent.trim()) {
      authorInfo.append(
        p(
          { class: 'card-with-quote-author-extra' },
          authorExtraRow.textContent.trim(),
        ),
      );
    }

    if (authorInfo.children.length) {
      authorMeta.append(authorInfo);
    }

    if (authorMeta.children.length) {
      quoteWrapper.append(authorMeta);
    }

    contentCol.append(quoteWrapper);
  }

  const buttonsWrapper = div({ class: 'card-with-quote-buttons' });

  const createButton = (textRow, linkRow, targetRow, styleRow) => {
    if (!textRow?.textContent.trim()) return null;

    const text = textRow.textContent.trim();
    const href = linkRow?.getAttribute('href') || '#';
    const target = targetRow?.textContent.trim() || '_self';
    const style = styleRow?.textContent.trim() || 'primary';

    const buttonEl = linkRow || document.createElement('a');
    buttonEl.textContent = text;
    buttonEl.href = href;
    buttonEl.target = target;
    buttonEl.className = `button ${style}`;

    return p({ class: 'button-container' }, buttonEl);
  };

  const btn1 = createButton(btn1TextRow, btn1LinkRow, btn1TargetRow, btn1StyleRow);
  const btn2 = createButton(btn2TextRow, btn2LinkRow, btn2TargetRow, btn2StyleRow);

  if (btn1) buttonsWrapper.append(btn1);
  if (btn2) buttonsWrapper.append(btn2);

  if (buttonsWrapper.children.length) {
    contentCol.append(buttonsWrapper);
  }

  const layout = div({ class: 'card-with-quote-block-wrapper' });

  if (reversed) {
    if (contentCol) layout.append(contentCol);
    if (imageCol) layout.append(imageCol);
  } else {
    if (imageCol) layout.append(imageCol);
    if (contentCol) layout.append(contentCol);
  }

  block.append(layout);
}
