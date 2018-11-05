import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {workPage} from '../../lib/animateElements';
import bodymovin from 'lottie-web';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
import Mouse from '../../lib/mouse';
// let scrollPos = 0;
let supportsWheel = !1;
let animEnCours = !1
let delta = 0;
let current = 0;
let sens = !0;
let quotient = -1;

let timeOut = null;

class Work extends Component {
  state = {
    data: null,
    case: 0,
    scrolled: false
  }

  constructor(props) {
    super(props);
    if (timeOut) clearTimeout(timeOut);
  }

  handleMouseEnter() {
    console.log('in');
    let $circle = document.querySelector(`.circle-mouse`);

    Velocity($circle, {marginTop: `30px`} , {loop:  true}, {easing: `ease-out`});
    $circle.style.fill = 'white';
    $circle.style.stroke = '#3d72a4';
    $circle.style.strokeWidth = 3;
  }

  handleMouseOut() {
    let $circle = document.querySelector(`.circle-mouse`);
    // let resetvalue = $circle.style.transform.match(/\d+/g).map(Number);
    Velocity($circle, `stop`);
    $circle.style.fill = 'black';
    $circle.style.stroke = 'none';
    $circle.style.strokeWidth = `none`;
    $circle.style.marginTop = null;
    // console.log()
    // $circle.style.transform = `translateY(-${resetvalue[0] + '.' + resetvalue[1]}px);`
  }

  componentDidMount() {
    document.querySelector(`.circle-mouse`).style.fill = `black`;
    document.querySelector(`.work-frame__button`).addEventListener(`mouseenter`, this.handleMouseEnter);
    document.querySelector(`.work-frame__button`).addEventListener(`mouseleave`, this.handleMouseOut);
    Mouse();

    fetch('./assets/data/projectdata.json', {
      headers : {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(response => response.json())
      .then(data => this.setState({data}));

    workPage();
    bodymovin.loadAnimation({
       container: document.querySelector(`.drawline`),
       renderer: `svg`,
       loop: false,
       autoplay: true,
       path: `../assets/data/line.json`
     });

     bodymovin.loadAnimation({
        container: document.querySelector(`.circles-animation`),
        renderer: `svg`,
        loop: false,
        autoplay: true,
        path: `../assets/data/circles.json`
      });
    document.querySelector(`.name`).style.color = '#3B3B3B';
    document.addEventListener("wheel", this.scrollEvent),
    document.addEventListener("mousewheel", this.scrollEvent),
    document.addEventListener("DOMMouseScroll", this.scrollEvent),
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if(keyName==='ArrowDown') this.keyDown()
      if(keyName==='ArrowUp') this.keyUp()
    })


    const selectedOption = localStorage.getItem('currentCase') || 0;
    if (selectedOption !== 'NaN') this.setState({case: parseInt(selectedOption) })
    document.querySelector(`.name`).style.color = '#3B3B3B';
  };

  componentWillUnmount() {
    document.removeEventListener('wheel', this.scrollEvent);
    document.removeEventListener('mousewheel', this.scrollEvent);
    document.removeEventListener('DOMMouseScroll', this.scrollEvent);
    if (timeOut !== null) clearTimeout(timeOut);
    localStorage.setItem('currentCase', this.state.case);
  };

  keyDown = () => {
    console.log('keydown detected');
    if (this.state.case !== this.state.data.length) {
      if (this.state.case + 1 <= this.state.data.length - 1) {
        this.setState({ case: this.state.case + 1 });
        workPage();
      }
    }
  }

  keyUp = () => {
    if (this.state.case - 1 >= 0) {
      this.setState({case: this.state.case - 1});
      workPage();
    }
  }

  scrollEvent = e => {
    console.log("scrollEvent");

    let { scrolled } = this.state;

    if ("wheel" === e.type) supportsWheel = !0;
    else if (supportsWheel) return;

    delta = e.deltaY || -e.wheelDelta || e.detail || 1;
    // e.preventDefault();
    e.stopPropagation();

    if (!scrolled) {
      if (delta >= 0) {
        if (this.state.case !== this.state.data.length) {
          if (this.state.case + 1 <= this.state.data.length - 1) {
            this.setState({ case: this.state.case + 1 });
            workPage();
          }
        }
      } else {
        if (this.state.case - 1 >= 0) {
          this.setState({case: this.state.case - 1});
          workPage();
        }
      }

      if (timeOut !== null) clearTimeout(timeOut);
      this.setState({ scrolled: true })
    }
  }


	checkStatus = (response) => {
		if (!response.ok) throw Error(response.statusText);
    return response;
	};

  render() {
    let project = this.state.data;
    if (this.state.scrolled) timeOut = setTimeout(() => this.setState({ scrolled: false }), 2000);

    return (
      <div className="home">
        <div>
          <p className="status"></p>
        </div>
        <header>
          <nav>
            <div className="name">
              <span>Yacine.</span>
            </div>
          </nav>
        </header>
        <main>
        <svg className="circle-mouse">
        </svg>
          <section className="page-work" id="page-work">

            <section className="page-work__content">
              <section className="content_header">
                <div className="content_header__left">
                  <div className="content-title__container">
                      <h1 className="content-title">
                        {
                          project ? project[this.state.case].name : null
                        }
                      </h1>
                      <div className="drawline">

                      </div>
                  </div>
                  <div className="content-summary">
                      <p className="content-summary__text">
                          {
                            project ? project[this.state.case].summary : null
                          }
                      </p>
                    </div>
                </div>
                <div className="content_header__right">
                  <div className="content-summary__image">
                   <img className="content-summary__image-style" src={`./assets/img/${project ? project[this.state.case].name : null}.png`} alt="Vertigo" />
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
                        project ? project[this.state.case].role : null
                    }
                  </p>
                </div>
                <div className="content-info__agency">
                  <p className="content-info__title">
                    Agency
                  </p>
                  <p className="content-info__body">
                    {
                      project ? project[this.state.case].agency : null
                    }
                  </p>
                </div>
                  <div className="content-info__year">
                    <p className="content-info__title">
                      Year
                    </p>
                    <p className="content-info__body">
                      {
                        project ? project[this.state.case].year : null
                      }
                    </p>
                  </div>
              </div>
            </section>
            <section className="work-frame">
              <div className="work-frame__indicator">
                <p className="work-frame__indicator-p">
                  <span className="current">
                  { this.state.case + 1 }
                  </span>
                  <span className="slash">
                  /
                  </span>
                  <span className="total">
                  { this.state.data ? this.state.data.length : 0 }
                  </span>
                </p>
              </div>
              <div className="work-frame__button">
                <p className="work-frame__button-p">
                  <Link to={`/workdetail/${this.state.case}`}>view case</Link>
                  {/* <Link to={'/ideas/'+this.props.testvalue }>Create Idea</Link>
                  {`/request/${_id}`} */}
                </p>
              </div>

            </section>
          </section>
        </main>
      </div>
    );
    // }
  };
};


export default Work;
