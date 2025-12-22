export default function decorateCompareAccounts(block) {
  const wrapper = block.querySelector('div');
  if (!wrapper) return;

  wrapper.classList.add('compare-accounts-cards');

  const allCards = wrapper.querySelectorAll('div');

  allCards?.forEach((card) => {
    card.classList.add('compare-accounts-card');
    if (card.querySelector('pre') && card.querySelector('pre')?.innerHTML?.includes('active')) {
      card?.classList.add('active');
      card.querySelector('pre').remove();
    }
  });
}
