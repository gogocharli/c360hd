const menuToggleEl = document.querySelector('.menu-toggle');
const mainNavEl = document.querySelector('.nav');

menuToggleEl.addEventListener('click', () => {
  mainNavEl.classList.toggle('is-open');

  if (mainNavEl.classList.contains('is-open')) {
    menuToggleEl.style.color = 'var(--color-primary)';

    gsap.to('.burger__top', {
      rotation: 45,
      transformOrigin: '50% 50%',
      y: 8,
    });

    gsap.to('.burger__bottom', {
      rotation: -45,
      transformOrigin: '50% 50%',
      y: -8,
    });

    gsap.to('.burger__mid', { width: 0 });
  } else {
    gsap.to('.burger__top', { rotation: 0, y: 0 });
    gsap.to('.burger__bottom', { rotation: 0, y: 0 });
    gsap.to('.burger__mid', { width: 28 });
    menuToggleEl.style.color = 'var(--color-accent)';
  }
});

// Hydrate iframe on index page
const mapsEl = document.querySelector('[title=Otaku Manga Lounge]');
window.onload = () => {
  mapsEl.src = `https://www.google.com/maps/embed?pb=!4v1595957210621!6m8!1m7!1sCAoSLEFGMVFpcE9wNHNLWVY1ZlVuSkJHbFl3bzJRVTh6THQ1Uk5ZZFgwLU8tNDlS!2m2!1d45.51811258162802!2d-73.56959223747253!3f67.5!4f1.2999999999999972!5f0.7820865974627469`;
};
