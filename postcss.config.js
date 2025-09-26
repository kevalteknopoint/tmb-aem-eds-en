module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-sorting': {
      order: [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules'
      ],
      'properties-order': 'alphabetical',
      'unspecified-properties-position': 'bottom',
      'sort-order': 'alphabetical',
    },

    'postcss-sort-media-queries': {
      sort: 'mobile-first'
    }
  }
};
