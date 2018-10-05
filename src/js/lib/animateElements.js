import Anims from './Animations';

export function workPage() {
      const $slidesUpTitle = document.querySelector(`.content-title`);
      const $slidesUpSummary = document.querySelector(`.content-summary__text`)
      const $slidesRightImage = document.querySelector(`.content-summary__image`);
      Anims($slidesUpTitle, `transition.slideUpIn`, 800, 100, "ease-out");
      Anims($slidesUpSummary, `transition.slideUpIn`, 1600, 700, "easeInSine");
      Anims($slidesRightImage, `transition.slideRightIn`, 1200, 300, "easeOutQuad");
};

  // const $slidesLeft = document.querySelectorAll(`.dreaming__article-left, .dimension__article-left, .memory__article-left`);
  // const $slidesRight = document.querySelectorAll(`.dreaming__article-bottom, .subscribe__article`);
  // const $flipsIn = document.querySelectorAll(`.dreaming__article-right, .dimension__article-image`);
  // Anims($slidesUp, `transition.slideUpIn`, 3000);
  // $slidesLeft.forEach(elem => {
  //   Anims(elem, `transition.slideLeftIn`, 1000);
  // });
  // $flipsIn.forEach(elem => {
  //   Anims(elem, `transition.flipXIn`, 1000);
  // });
  // $slidesRight.forEach(elem => {
  //   Anims(elem, `transition.slideRightIn`, 1000);
  // });
