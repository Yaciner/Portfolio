import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
    console.log('mouse out');
    called = false;
  }

  render() {
    const { error, project } = this.state;

    if (error) return <h1>An error occured</h1>
    if (!project) return <h1>loading</h1>
    return (
      <div className="detail">
        <div><p className="status"></p></div>
        <header>
          <nav>
            <div className="name">
              <span><Link to='/'>Yacine.</Link></span>
            </div>
          </nav>
        </header>
        <main>
          <section className="page-work" id="page-work">
            <section className="page-work__content">
              <Link className="page-work__back" to="/work">
                <img className="page-work__back_arrow" src="./assets/svg/arrow.svg" alt="arrow" />
               <p>Back to cases</p>
              </Link>
                <video id="video" autoPlay loop>
                   <source src="./assets/video/charachter.mp4" type="video/mp4" media="all and (max-width:480px)" />
                </video>
            </section>
          </section>
        </main>
      </div>
    );
  }
}
