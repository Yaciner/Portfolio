import Anims from './Animations';
import AnimsOnScroll from './AnimationsOnScroll';

export function workPage() {
      const $slidesUpTitle = document.querySelector(`.content-title`);
      const $slidesUpSummary = document.querySelector(`.content-summary__text`);
      const $slidesRightImage = document.querySelector(`.content-summary__image`);

      Anims($slidesUpTitle, `transition.slideUpIn`, 800, 100, "ease-out");
      Anims($slidesUpSummary, `transition.slideUpIn`, 1600, 700, "ease-out");
      Anims($slidesRightImage, `transition.slideRightIn`, 1200, 300, "ease-out");
};

export function animateAbout() {
      const $slidesUpTitle = document.querySelector(`.about-header__text`);
      Anims($slidesUpTitle, `transition.slideUpIn`, 2000, 6000, "ease-out");
};

export function animateDetail() {
      const $slidesUpAbout = document.querySelectorAll(`.target-title, .target-info, .project-screens__image, .ProximaNovabold, .project-fonts__name, .ProximaNovaregular, .project-fonts__name, .project-fonts__example`);
      $slidesUpAbout.forEach(elem => {
        AnimsOnScroll(elem, `transition.slideUpIn`, 1000);
    });
};