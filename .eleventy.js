const i18n = require('eleventy-plugin-i18n');

module.exports = (config) => {
  // Plugins
  config.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en-CA',
    },
  });

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
