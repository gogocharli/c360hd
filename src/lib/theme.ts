export function changeThemeOnScrollPosition() {
  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.target) observer.disconnect();

        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setTheme(bodyEl, 'light');
        } else {
          clearTheme(bodyEl);
        }
      });
    },
    {
      threshold: [0.25, 0.5, 0.75],
    },
  );

  let bodyEl = document.querySelector('body');
  let targetEl = document.querySelector('#index-hero');
  observer.observe(targetEl);

  return () => {
    observer.unobserve(targetEl);
    // Reset the values to the ones from their respective pages
    clearTheme(bodyEl);
  };
}

const styles = ['bg', 'fg', 'hg', 'tint'] as const;
const choices = { bg: 'main', fg: 'main', hg: 'highlight', tint: 'tint' };
function setTheme(element: HTMLElement, theme: 'light' | 'dark') {
  styles.forEach((style: typeof styles[number]) => {
    let currentTheme: 'light' | 'dark' = theme;
    // Revert colors for the foreground color
    style === 'fg' && (currentTheme = theme == 'dark' ? 'light' : 'dark');

    element.style.setProperty(
      `--theme-color-${style}`,
      `var(--color-${currentTheme}-${choices[style]})`,
    );
  });
}

function clearTheme(element: HTMLElement) {
  styles.forEach((style) =>
    element.style.setProperty(`--theme-color-${style}`, 'inherit'),
  );
}
