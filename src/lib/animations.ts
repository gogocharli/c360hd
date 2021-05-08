import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { browserScreens, BrowserState } from '@components/Browser/browser';
import type { Dispatch, SetStateAction } from 'react';

const elementsToFadeIn =
  '#basics content > *, #basics .image, .panel__container, .features h2, .features li > *, .features a, #realisations content > *, #realisations a, .icon-stack > *';

export function animateSectionsOnScroll(
  browserScreen: BrowserState,
  setBrowserScreen: Dispatch<SetStateAction<BrowserState>>,
) {
  return () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      toggleActions: 'restart none reverse none',
      markers: false,
    });

    gsap.set('.panel__container', { overflowX: 'hidden' });
    ScrollTrigger.matchMedia({
      '(max-width: 50em) and (prefers-reduced-motion: no-preference)': function () {
        const journeyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#journey',
            start: 'top top',
            end: '+=1000',
            scrub: true,
            pin: true,
          },
        });

        const journeyCards = gsap.utils.toArray<HTMLElement>('.journey-step');
        const journeyScene = document.querySelector<HTMLDivElement>(
          '#journey .scene',
        );

        journeyTimeline
          .to(journeyScene, {
            yPercent: 0,
            opacity: 1,
          })
          .to(journeyScene, {
            onUpdate: function () {
              const progress = this.ratio;

              // Reset to idle screen when animation ends
              if (progress < 0.01) return setBrowserScreen('idle');

              // Getting an integer depending on the current progress
              const clampedProgress = Math.floor(
                progress * (journeyCards.length - 1),
              );

              // Only set the screen state when it's not equal to the current
              // computed to avoid unnecessary re-renders
              const computedScreen = browserScreens[clampedProgress + 1];
              if (computedScreen != browserScreen) {
                setBrowserScreen(computedScreen);
                journeyScene.setAttribute('data-scene', `${clampedProgress}`);
              }
            },
          });

        const carouselCards = gsap.utils.toArray<HTMLUListElement>('.panel');
        const carouselContainer = document.querySelector<HTMLElement>(
          '.panel__container',
        );
        gsap.set(carouselCards, {
          position: 'absolute',
          left: '50%',
          xPercent: (index) => {
            let position = index * 150 - 50;
            let direction = index % 2 == 0 ? 1 : -1;
            return position * direction;
          },
          opacity: 0,
        });
        gsap.to(carouselCards, {
          xPercent: -50,
          opacity: 1,
          rotate: (index) => {
            if (index == 0) return index;

            let angle = Math.random() * index + 1;
            angle = index % 2 == 0 ? angle * -1 : angle;
            return angle;
          },
          stagger: 0.5,
          ease: 'var(--transition-curve)',
          scrollTrigger: {
            trigger: carouselContainer,
            start: 'top 5px',
            scrub: 0.5,
            pin: true,
          },
        });

        return () => {
          gsap.set(carouselCards, {
            position: 'relative',
            left: 0,
            xPercent: 0,
            opacity: 1,
          });
        };
      },
      '(min-width: 50em) and (max-width: 65em) and (prefers-reduced-motion: no-preference)': function () {
        const journeyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#journey',
            start: 'top 10%',
            scrub: true,
            pin: true,
          },
        });

        const journeyCards = gsap.utils.toArray<HTMLElement>('.journey-step');
        const journeyScene = document.querySelector<HTMLDivElement>(
          '#journey .scene',
        );

        journeyTimeline
          .to(journeyScene, {
            yPercent: 0,
            opacity: 1,
          })
          .to(journeyScene, {
            onUpdate: function () {
              const progress = this.ratio;

              // Reset to idle screen when animation ends
              if (progress < 0.01) return setBrowserScreen('idle');

              // Getting an integer depending on the current progress
              const clampedProgress = Math.floor(
                progress * (journeyCards.length - 1),
              );

              // Only set the screen state when it's not equal to the current
              // computed to avoid unnecessary re-renders
              const computedScreen = browserScreens[clampedProgress + 1];
              if (computedScreen != browserScreen) {
                setBrowserScreen(computedScreen);
                journeyScene.setAttribute('data-scene', `${clampedProgress}`);
              }
            },
          });

        const carouselCards = gsap.utils.toArray<HTMLUListElement>('.panel');
        const carouselContainer = document.querySelector<HTMLElement>(
          '.panel__container',
        );
        gsap.to(carouselCards, {
          xPercent: -100 * (carouselCards.length - 1),
          ease: 'linear',
          scrollTrigger: {
            trigger: '#basics',
            start: 'top 10px',
            scrub: true,
            pin: true,
            snap: 0.5,
            end: () => '+=' + (carouselContainer.offsetWidth + 60),
          },
        });
      },

      '(min-width: 65em) and (prefers-reduced-motion: no-preference)': function () {
        const browserMoveOpts = {
          trigger: '#browser',
          start: 'top 70%',
          scrub: true,
          end: 'top 30%',
        };
        gsap.set('#browser', { opacity: 0, yPercent: -30 });
        gsap.set('.journey-step', { opacity: 0, yPercent: 30 });

        gsap.to('#browser', {
          scrollTrigger: {
            ...browserMoveOpts,
            start: 'top 60%',
          },
          opacity: 1,
          yPercent: 0,
        });

        gsap.to('.hero__content > *', {
          scrollTrigger: browserMoveOpts,
          opacity: 0,
          yPercent: -30,
        });

        gsap.to('#fake-browser', {
          scrollTrigger: browserMoveOpts,
          opacity: 0,
          y: 500,
        });

        const journeyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#journey',
            start: '140px top',
            end: '+=2000',
            scrub: true,
            pin: true,
          },
        });

        const journeyCards = gsap.utils.toArray<HTMLElement>('.journey-step');

        journeyTimeline
          .to('.journey-step', {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
          })
          .to(journeyCards, {
            onUpdate: function () {
              const progress = this.ratio;

              // Reset to idle screen when animation ends
              if (progress < 0.01) return setBrowserScreen('idle');

              // Getting an integer depending on the current progress
              const clampedProgress = Math.floor(
                progress * (journeyCards.length - 1),
              );

              // Only set the screen state when it's not equal to the current
              // computed to avoid unnecessary re-renders
              const computedScreen = browserScreens[clampedProgress + 1];
              if (computedScreen != browserScreen) {
                setBrowserScreen(computedScreen);
              }

              journeyCards.forEach((c, i) => {
                // Remove the class on the last selected element
                // Add to the one to be featured
                c.classList.remove('is-featured');
                clampedProgress == i && c.classList.add('is-featured');
              });
            },
          });

        const carouselCards = gsap.utils.toArray<HTMLUListElement>('.panel');
        const carouselContainer = document.querySelector<HTMLElement>(
          '.panel__container',
        );
        gsap.to(carouselCards, {
          xPercent: -100 * (carouselCards.length - 1),
          ease: 'linear',
          scrollTrigger: {
            trigger: '#basics',
            start: 'bottom bottom',
            pin: true,
            scrub: 1,
            snap: 0.5,
            end: () => '+=' + carouselContainer.offsetWidth,
          },
        });

        return () => {
          // Revert non-scrolltrigger related tweens
          gsap.set('#browser', { opacity: 1, yPercent: 0 });
          gsap.set('.journey-step', { opacity: 1, yPercent: 0 });
        };
      },
      all: () => {
        gsap.set(elementsToFadeIn, { y: 10, opacity: 0 });
        ScrollTrigger.batch(elementsToFadeIn, {
          interval: 0.1,
          batchMax: 3,
          onEnter: (elements) =>
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              overwrite: true,
            }),
        });

        () => {
          gsap.set(elementsToFadeIn, { y: 0, opacity: 1 });
        };
      },
    });

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((t) => t.kill());
      gsap.set('.panel__container', { overflowX: 'auto' });
    };
  };
}
