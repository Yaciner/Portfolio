import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import 'particles.js/particles';
import Header from './Header';
const particlesJS = window.particlesJS;

class Homepage extends Component {

componentDidMount() {
  document.querySelector(`.page-controls__work_text`).addEventListener(`mouseenter`, this.handleMouseEnter);
  document.querySelector(`.page-controls__work_text`).addEventListener(`mouseleave`, this.handleMouseOut);
  document.querySelector(`.page-controls__about_text`).addEventListener(`mouseenter`, this.handleMouseEnter);
  document.querySelector(`.page-controls__about_text`).addEventListener(`mouseleave`, this.handleMouseOut);
  if(this.isMobileDevice() === false) {
    particlesJS.load('particles-js', 'assets/data/particles.json', function() {
  });
  }
}

<<<<<<< HEAD
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

=======
>>>>>>> master
isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


  render() {

    return (
      <div className="home">
      <div><p className="status"></p></div>
      <Header />
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
          </h1>
        </section>
      </main>
      </div>
    );
  }
};


export default Homepage;
