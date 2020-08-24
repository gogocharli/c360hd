// Hydrate iframe on index page
const carouselEl = document.querySelector('.carousel');

const iframeObsv = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        iframe = entry.target.firstElementChild;
        iframe.src = `https://www.google.com/maps/embed?pb=!4v1595957210621!6m8!1m7!1sCAoSLEFGMVFpcE9wNHNLWVY1ZlVuSkJHbFl3bzJRVTh6THQ1Uk5ZZFgwLU8tNDlS!2m2!1d45.51811258162802!2d-73.56959223747253!3f67.5!4f1.2999999999999972!5f0.7820865974627469`;
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
  }
);

window.onload = () => {
  iframeObsv.observe(carouselEl);
};
