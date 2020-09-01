<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
    font-family: 'Lunchtype Regular';
    src: url('/assets/lunchtype22-regular-webfont.woff2') format('woff2'),
      url('/assets/lunchtype22-regular-webfont.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'Lunchtype Expanded';
    src: url('/assets/lunchtype24-regular-expanded-webfont.woff2')
        format('woff2'),
      url('/assets/lunchtype24-regular-expanded-webfont.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'Lunchtype Expanded Medium';
    src: url('/assets/lunchtype24-medium-expanded-webfont.woff2')
        format('woff2'),
      url('/assets/lunchtype24-medium-expanded-webfont.woff') format('woff');
    font-display: swap;
  }

  :root {
    --font-regular: 'Lunchtype Regular';
    --font-expanded: 'Lunchtype Expanded';
    --font-expanded-medium: 'Lunchtype Expanded Medium';

    --color-primary: #ffffff;
    --color-secondary: #000000;
    --color-tertiary: #eeeeee;
    --color-accent: #2f80ed;

    --flow-space: 16px;
  }

  /* Styles */
  body {
    font-family: var(--font-regular), --apple-system, Arial, Helvetica,
      sans-serif;
    line-height: 1.45;
  }

  main {
    padding-bottom: 3em;
  }

  h1 {
    font-family: var(--font-expanded-medium);
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-size: 3.6rem;
    color: var(--color-accent);
  }

  h1 + p {
    font-size: 1.2rem;
  }

  h2 {
    font-family: var(--font-expanded-medium);
    line-height: 1.1;
    font-size: 2rem;
    margin-bottom: var(--flow-space);
  }

  h2 span {
    font-family: var(--font-regular);
    font-size: 1rem;
    display: block;
  }

  h3 {
    font-family: var(--font-expanded);
    font-size: 2rem;
    line-height: 1.1;
  }

  button {
    border: 0;
    background: 0;
    cursor: pointer;
  }

  a[class] {
    text-decoration: none;
  }

  .button {
    display: inline-block;
    font-family: var(--font-regular);
    font-size: 1.2rem;
    padding: 0.5em 1em;
    text-align: center;
    background-color: var(--color-accent);
    color: var(--color-primary);
  }
</style>
