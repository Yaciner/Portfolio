import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import Mouse from '../lib/mouse';
// import Velocity from 'velocity-animate';
// import 'velocity-animate/velocity.ui';
import 'particles.js/particles';
import Typed from 'typed.js';
const particlesJS = window.particlesJS;


// const Homepage = () => {
class Homepage extends Component {

componentDidMount() {
  // Mouse();
  document.querySelector(`.page-controls__work_text`).addEventListener(`mouseenter`, this.handleMouseEnter);
  document.querySelector(`.page-controls__work_text`).addEventListener(`mouseleave`, this.handleMouseOut);
  document.querySelector(`.page-controls__about_text`).addEventListener(`mouseenter`, this.handleMouseEnter);
  document.querySelector(`.page-controls__about_text`).addEventListener(`mouseleave`, this.handleMouseOut);
  if(this.isMobileDevice() === false) {
    particlesJS.load('particles-js', 'assets/data/particles.json', function() {
  });
  }

  this.animateText();
}

animateText() {
  new Typed('.page-home__subtitle', {
  strings: [`My name is Yacine Redjala.`, `I almost graduated.`, `Already looking for a new opportunity.`],
  typeSpeed: 20,
  backSpeed: 0,
  smartBackspace: true,
  fadeOut: true,
  loop: true
});
 };

isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// handleMouseEnter() {
//   let $circle = document.querySelector(`.circle-mouse`);
//   Velocity($circle, {marginTop: `30px`} , {loop:  true}, {easing: `ease-out`});
//   $circle.style.fill = 'black';
//   $circle.style.stroke = '#3d72a4';
//   $circle.style.strokeWidth = 3;
// }

// handleMouseOut() {
//   let $circle = document.querySelector(`.circle-mouse`);
//   // let resetvalue = $circle.style.transform.match(/\d+/g).map(Number);
//   Velocity($circle, `stop`);
//   $circle.style.fill = 'white';
//   $circle.style.stroke = 'none';
//   $circle.style.strokeWidth = `none`;
//   $circle.style.marginTop = null;
//   // console.log()
//   // $circle.style.transform = `translateY(-${resetvalue[0] + '.' + resetvalue[1]}px);`
// }

  render() {

    return (
      <div className="home">
      <div><p className="status"></p></div>
      <div className="particles" id="particles-js"></div>
      <header>
        <nav>
          <div className="name">
            <span>Yacine.</span>
          </div>
        </nav>
      </header>
      <main>
        <section className="page-home active" id="page-home">
          <div className="page-controls">
            <div className="page-controls__empty">
              <div></div>
            </div>
            <div className="page-controls__work">
                <p className="page-controls__work_text"><Link to='/work'>work</Link></p>
              <div className="page-controls__work_line"></div>
            </div>
            <div className="page-controls__about">
            <p className="page-controls__about_text">
              <Link to='/about'>about</Link>
            </p>
              <div></div>
            </div>
          </div>

          <h1 className="page-home__title">
          I'm a digital designer and developer<span className="colored">.</span>
          <br></br>
            <span className="page-home__subtitle">My name is Yacine Redjala.</span>
          </h1>
        </section>
      </main>
      </div>
    );
  }
};


export default Homepage;
