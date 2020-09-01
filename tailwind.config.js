module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.svelte',
      './src/**/*.svg',
    ],
  },
  plugins: [require('@tailwindcss/custom-forms')],
  theme: {
    extend: {
      fontFamily: {
        inter: '"Inter", sans-serif;',
      },
    },
  },
};
