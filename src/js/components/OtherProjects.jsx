import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';
let called = false;


export default class OtherProjects extends Component {
  state = {
    project: null,
    error: null
  }

  componentDidMount() {
    if (!this.state.project) {
      fetch('./assets/data/moreprojects.json', {
        headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(results => {
          this.setState({
            project: results
          });
          // animateDetail();
          document.querySelector(`.name`).style.color = '#3B3B3B';
        }).catch((e => this.setState({ error: e })));
        return
    }
  }

  onHover() {
    if(called === false) {
      this.animate();
      called = true;
    }
    else {
      this.onOut();
    }

}
  onOut() {
    called = false;
  }

  render() {
    const { error, project } = this.state;

    if (error) return <h1>An error occured</h1>
    if (!project) return <h1>loading</h1>
    return (
      <div className="detail">
        <div><p className="status"></p></div>
        <Header />
        <main>
          <section className="page-work" id="page-work">
            <section className="page-work__content">
              <Link className="page-work__back" to="/work">
                <img className="page-work__back_arrow" src="./assets/svg/arrow.svg" alt="arrow" />
               <p>Back to cases</p>
              </Link>
              <section className="section-other">
                <section className="other-element">
                <header>
                <h1>Just a random charachter I made and animated.</h1>
                </header>
                  <video onClick={this.videoToggle} id="video" autoPlay loop muted>
                     <source src="./assets/video/charachter.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>This was a concept explanation video I made with a voice over I recorded.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/wow.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>Here we had to make an introduction video that was easy to use for other people that wanted to make a video for De Warmste Week 2018.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/warmsteweek.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>This is an appstore preview for the app WePlant I made.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/WePlant.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>Another appstore preview I made for my app called Mornings.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/Hi.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>This was an animation I made to be used as background for the site I made for Vertigo.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/vertigo.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>A little random Google Doodle.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/doodle.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>Advanced typo animations for The Faculty mockup.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/faculty.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>An AE 3D mockup for Italmaster.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/italmaster.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
                <section className="other-element">
                <header>
                  <h1>A brand case for hairco.</h1>
                </header>
                  <video id="video" autoPlay loop muted>
                     <source src="./assets/video/hairco.mp4" type="video/mp4" media="all and (max-width:480px)" />
                  </video>
                </section>
              </section>
            </section>
          </section>
        </main>
      </div>
    );
  }
}
