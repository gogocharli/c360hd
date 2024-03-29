const path = require('path');
const { i18n } = require('./next-i18next.config');
const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr({
  i18n,
  images: {
    domains: ['dl.airtable.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules/gorko')],
  },
});
