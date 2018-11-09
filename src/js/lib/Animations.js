import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
// let myopacity = 0;

const Anim = ($el, animString, offsetMore, delay) => {

  addHideClass($el);
  // animationOut($el, animString, offsetMore, delay);
  // setInterval(()=> {
  //   handlePageScroll($el, animString, offsetMore, delay); }, 3000
  // );
  handlePageScroll($el, animString, offsetMore, delay);
};

// const animationOut = ($el, animString, offsetMore, delay, easing) => {
//   if ($el.classList.contains(`hide`)) {
//     myfade($el);
//     Velocity($el, 'transition.slideDownIn', {duration: offsetMore}, {easing: easing}, {delay: delay});
//     }
// }

const handlePageScroll = ($el, animString, offsetMore, delay, easing) => {
  if ($el.classList.contains(`hide`)) {
    Velocity($el, animString, {duration: offsetMore}, {easing: easing}, {delay: delay});
    $el.classList.remove(`hide`);
  }
};

const addHideClass = $el => {
  $el.classList.add(`hide`);
};

// const myfade = ($el) => {
//   if (myopacity<1) {
//  myopacity += .075;
//     setInterval(() => {myfade()},100);
//   }
//   console.log($el);
//   $el.style.opacity = myopacity;
// }

export default Anim;
