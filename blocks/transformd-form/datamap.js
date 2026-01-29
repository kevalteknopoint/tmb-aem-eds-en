const dataMapMoObj = {
  CLASS_PREFIXES: ['block-item', 'block-subitem', 'block-subitem-finelsub'],
  addIndexed(parentElement, level = 0) {
    if (level >= this.CLASS_PREFIXES.length || !parentElement.children.length) {
      return;
    }
    const prefix = this.CLASS_PREFIXES[level];
    const { children } = parentElement; // Cache children for clarity.
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const index = i + 1; // Class names are typically 1-based.
      child.classList.add('comlist');
      child.classList.add(`${prefix}${index}`);
      this.addIndexed(child, level + 1);
    }
  },
};
export default dataMapMoObj;
