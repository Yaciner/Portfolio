import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
// let myopacity = 0;

const Anim = ($el, animString, offsetMore, delay) => {

  addHideClass($el);
  handlePageScroll($el, animString, offsetMore, delay);
};

const handlePageScroll = ($el, animString, offsetMore, delay, easing) => {
  if ($el.classList.contains(`hide`)) {
    Velocity($el, animString, {duration: offsetMore}, {easing: easing}, {delay: delay});
    $el.classList.remove(`hide`);
  }
};

const addHideClass = $el => {
  $el.classList.add(`hide`);
};

export default Anim;
