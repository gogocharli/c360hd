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
