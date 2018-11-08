import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import 'velocity-animate/velocity.ui';
import 'particles.js/particles';
import Typed from 'typed.js';
import {animateAbout} from '../../lib/animateElements';
const particlesJS = window.particlesJS;
let animationDone = false;

class About extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.querySelector(`.page-about`).classList.add(`animation-about`);
    // this.animateText();
    this.startParticles();
    // this.animateText();
    animateAbout();
    document.querySelector(`.scroll-mouse`).style.fill = `white`;
  }

  startParticles () {
        particlesJS.load('particles-js', 'assets/data/particles.json', function() {
        // console.log('callback - particles.js config loaded');
      });
  }

  // animateText() {
  //   new Typed('.about-header__text', {
  //   strings: [`          I’m <span className="bold-colored">Yacine Redjala</span>,<br></br>
  //             a devine <span className="bold-colored">student</span> enjoying<br></br>
  //             everything related to web.`],
  //   typeSpeed: 20,
  //   backSpeed: 0,
  //   smartBackspace: true,
  //   fadeOut: true,
  //   loop: true
  // });
  //  };


  // animateText() {
  //   new Typed('.about-animated__text', {
  //     strings: [`Hi.`, `Nice to meet you.`, `Allow me to introduce myself.`],
  //     typeSpeed: 30,
  //     backSpeed: 0,
  //     smartBackspace: true,
  //     fadeOut: true,
  //     loop: false,
  //     backDelay: 1000
  //   });
  //   //
  //   // if(animationDone === false) {
  //   //   setInterval(() => {
  //   //     window.scrollTo(0, window.innerHeight);
  //   //     animationDone = true;
  //   //   }, 7000)
  //   // }
  //
  //   // window.scrollTo()
  //  };

  render() {
    return (
      <div className="about">
      <div className="particles" id="particles-js"></div>
      <header>
        <nav>
          <div className="name">
            <span><Link to='/'>Yacine.</Link></span>
          </div>
        </nav>
      </header>
      <main>
        <section className="page-about">

        </section>
        <section className="page-about__overlay">
          <h1 className="about-header__text">
          I’m <span className="bold-colored">Yacine Redjala</span>,
          a <span className="link-to-out"><Link to="https://www.devine.be">devine</Link></span> <span className="bold-colored">student</span> enjoying
          everything related to web and I'm enthusiastic about learning as much
          as possible.<br></br><br></br>

          Currently a last year student and looking for a 3 month internship<span className="colored">.</span>
          </h1>
        </section>
        <div className="scroll-mouse__container">
          <img className="scroll-mouse" src='./assets/svg/mouse_debug.svg' alt="mouse" />
        </div>
        <section className="stuff-about-me">

        </section>
      </main>
      </div>

    );
  };
};


export default About;
