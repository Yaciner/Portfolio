import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {animateDetail} from '../lib/animateElements';
import Header from './Header';
let called = false;

export default class WorkDetail extends Component {
  state = {
    project: null,
    error: null
  }

  componentDidMount() {
    if (!this.state.project) {
      fetch('./assets/data/projectdata.json', {
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
          animateDetail();
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

  returnScreens(project, _id) {
      let images = [];

      if(project) {
        for(let i = 0; i < project[_id].screens; i++ ) {
          if(project[_id].mobile) {
            images.push(<img className="project-screens__image-mobile" src={`./assets/img/${project ? project[_id].name + i : null}.png`} alt="screens" />);
          }
          else {
            images.push(<img className="project-screens__image" src={`./assets/img/${project ? project[_id].name + i : null}.png`} alt="screens" />);
          }
        }
        return images;
      }
  }

  checkIfResponsive(project, _id) {
    if(project) {
      if(project[_id].responsive === true) {
        return (<section className="project-responsive">
            <img className="project-responsive__image" src={`./assets/img/${project ? project[_id].name : null}responsive.png`} alt="responsive" />
            <article>
              <header>Responsive.</header>
              <p>{project ? project[_id].responsiveinfo : null}</p>
            </article>
        </section>);
      }
    }
  }

  thereIsProject(project, _id) {
    let next = parseInt(_id) + 1;
    window.scrollTo(0,0);
    if(project.length - 1 > _id) {
      return (<section className="project-next">
        <Link to={"/workdetail/" + next}>
        <p className="project-next__p">
          Next Project
        </p>
      </Link>
      </section>);
    }
  }

  render() {
    const { error, project } = this.state;
    const { _id } = this.props;

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

            <section className="content_header">
              <div className="content_header__left">
                <div className="content-title__container">
                    <h1 className="content-title">
                      {
                        project ? project[_id].name : null
                      }
                    </h1>
                    <div className="drawline">

                    </div>
                </div>
                <div className="content-summary">
                    <p className="content-summary__text">
                        {
                          project ? project[_id].summary : null
                        }
                    </p>
                  </div>
              </div>
              <div className="content_header__right">
                <div className="content-summary__image">
                 <img className={`content-summary__image-style ${project[_id].mobile ? new String("mobile") : null}`} src={`./assets/img/${project ? project[_id].name : null}.png`} alt="Vertigo" />
               </div>
              </div>
            </section>
            <div className="content-info">
              <div className="content-info__role">
                <p className="content-info__title">
                  Role
                </p>
                <p className="content-info__body">
                  {
                      project ? project[_id].role : null
                  }
                </p>
              </div>
              <div className="content-info__agency">
                <p className="content-info__title">
                  Agency
                </p>
                <p className="content-info__body">
                  {
                    project ? project[_id].agency : null
                  }
                </p>
              </div>
                <div className="content-info__year">
                  <p className="content-info__title">
                    Year
                  </p>
                  <p className="content-info__body">
                    {
                      project ? project[_id].year : null
                    }
                  </p>
                </div>
            </div>
          </section>
        </section>
        <div className="scroll-mouse__container">
          <img className="scroll-mouse" src='./assets/svg/mouse.svg' alt="mouse" />

        </div>
        <section className="project-information">
          <article className="project-information__target">
            <article className="target-title">
              <h1 className="target-title__header">
                {
                  project ? project[_id].maintitle : null
                }
              </h1>
              <p className="target-title__skills">
                {
                  project ? project[_id].skills : null
                }
              </p>
              <p><a className="link-to-live" href={project ? project[_id].site : null}>Live version</a></p>
            </article>
            <article className="target-info">
              <div></div>
              <p>
                {
                  project ? project[_id].target.one : null
                }
              </p>

              <p>
                {
                  project ? project[_id].target.two : null
                }
              </p>
            </article>
          </article>
        </section>

        <section className="project-screens">
          <div className="project-screens__container">
              {this.returnScreens(project, _id)}
          </div>
        </section>

        <section className="project-fonts">
          <article className="project-fonts__big">
            <article>
              <span className={project ? 'heading_1 ' + project[_id].fonts.name[0] : null} >Aa</span>
              <span className="project-fonts__name">{project ? project[_id].fonts.heading : null}</span>

            </article>
            <article>
              <span className={project ? 'body_1 ' + project[_id].fonts.name[1] : null}>Aa</span>
              <span className="project-fonts__name">{project ? project[_id].fonts.body : null}</span>
            </article>
          </article>
          <article className="project-fonts__example">
            <p className={project ? 'heading_2 ' + project[_id].fonts.name[0] : null}>{project ? project[_id].name : null}</p>
            <p className={project ? 'body_2 ' + project[_id].fonts.name[1] : null}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </article>
        </section>
        {
          this.checkIfResponsive(project, _id)
        }

        {
          this.thereIsProject(project, _id)
        }
      </main>
      </div>
    );
  }
}
