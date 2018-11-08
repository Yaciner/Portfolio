import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import 'velocity-animate/velocity.ui';
import 'particles.js/particles';
import Typed from 'typed.js';
import {animateAbout} from '../../lib/animateElements';
import * as d3 from "d3";
import bodymovin from 'lottie-web';
const particlesJS = window.particlesJS;
let animationDone = false;

class About extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.querySelector(`.page-about`).classList.add(`animation-about`);
    this.startParticles();
    animateAbout();
    document.querySelector(`.scroll-mouse`).style.fill = `white`;
    this.generateSkills();
  }

  startParticles () {
        particlesJS.load('particles-js', 'assets/data/particles.json', function() {
      });
  }

  generateSkills() {
    bodymovin.loadAnimation({
       container: document.querySelector(`.development-skills`),
       renderer: `svg`,
       loop: false,
       autoplay: true,
       path: `../assets/data/developmentskills.json`
     });

     bodymovin.loadAnimation({
        container: document.querySelector(`.design-skills`),
        renderer: `svg`,
        loop: false,
        autoplay: true,
        path: `../assets/data/designskills.json`
      });
  }

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
          as possible<span className="colored">.</span><br></br><br></br>

          Currently a last year student and looking for a 3 month <span className="bold-colored">internship</span><span className="colored">.</span>
          </h1>
        </section>
        <div className="scroll-mouse__container">
          <img className="scroll-mouse" src='./assets/svg/mouse_debug.svg' alt="mouse" />
        </div>
        <section className="stuff-about-me">
          <article className="about-education">
            <header>My Education<span className="colored">.</span></header>
            <p>I started off in Bruges studying <span className="bold-colored">Economics</span> for about 4 years, untill my 2 last years when
            I did Accountancy there was some IT getting involved.<br></br><br></br>
            We started learning some really basic html & css, that’s when I wanted to <span className="bold-colored">learn more
            and more</span>.<br></br><br></br>
            So after graduation I decided to go on to University and that’s when I started <span className="bold-colored">Devine</span>,
            in Howest Kortrijk, which is really cool.

            </p>
          </article>
          <article className="about-skills">
          <header>My Skills<span className="colored">.</span></header>
            <section className="about-skills__graphs">
              <div className="development-skills">
                <header className="skill-header">
                  <h1>Development<span>.</span></h1>
                </header>
              </div>
              <div className="design-skills">
                <header className="skill-header">
                  <h1>Design<span>.</span></h1>
                </header>
              </div>
            </section>
          </article>
        </section>
      </main>
      </div>

    );
  };
};


export default About;
