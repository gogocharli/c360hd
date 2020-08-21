const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n/index');

module.exports = (config) => {
  // Plugins
  config.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en-CA',
    },
  });

  config.addPassthroughCopy('assets');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/scripts');
  config.addPassthroughCopy('_redirects');
  config.addPassthroughCopy('functions');

  return {
    // Specify templating engines
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    // Specify directories for eleventy
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
