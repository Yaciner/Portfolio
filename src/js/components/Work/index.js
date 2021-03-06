import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {workPage} from '../../lib/animateElements';
import bodymovin from 'lottie-web';
// import Hammer from 'hammerjs';
// import Velocity from 'velocity-animate';
// import 'velocity-animate/velocity.ui';
// import Mouse from '../../lib/mouse';
// let scrollPos = 0;
let supportsWheel = !1;
// let animEnCours = !1
let delta = 0;
// let current = 0;
// let sens = !0;
// let quotient = -1;
// let navigationActive = false;
let timeOut = null;
let clickState = 0;

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

  toggleElement() {
    if (clickState === 0) {
        document.querySelector('.name').style.color = 'white';
        // code snippet 1
        clickState = 1;
        document.querySelector('.menu-overlay').classList.add('open');
        document.querySelector('.current').style.display = 'none';
        document.querySelector('.total').style.display = 'none';
        document.querySelector('.slash').style.color = 'white';
        document.querySelector('.slash').innerHTML = 'X';
        document.querySelector(`.work-frame__indicator-p`).style.border = "1px solid white";
        document.addEventListener('keydown', (event) => {
          const keyName = event.key;
          if(keyName==='Escape'){
            clickState = 0;
            document.querySelector('.menu-overlay').classList.remove('open');
            document.querySelector('.name').style.color = 'black';
            document.querySelector('.current').style.display = 'inline';
            document.querySelector('.total').style.display = 'inline';
            document.querySelector('.slash').style.color = 'inherit';
            document.querySelector('.slash').innerHTML = '/';
            document.querySelector(`.work-frame__indicator-p`).style.border = "none";

          }
        })
    }

    else {
      // code snippet 2
      clickState = 0;
      document.querySelector('.menu-overlay').classList.remove('open');
      document.querySelector('.name').style.color = 'black';

      document.querySelector('.current').style.display = 'inline';
      document.querySelector('.total').style.display = 'inline';
      document.querySelector('.slash').style.color = 'inherit';
      document.querySelector('.slash').innerHTML = '/';
      document.querySelector(`.work-frame__indicator-p`).style.border = "none";
    }
  }

  componentDidMount() {
    // document.querySelector(`.circle-mouse`).style.fill = `black`;
    document.querySelector(`.work-frame__button`).addEventListener(`mouseenter`, this.handleMouseEnter);
    document.querySelector(`.work-frame__button`).addEventListener(`mouseleave`, this.handleMouseOut);
    document.querySelector(`.work-frame__indicator`).addEventListener(`click`, this.toggleElement);
    // Mouse();
    this.generateLister();

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
        container: document.querySelector(`.indicator_anim`),
        renderer: `svg`,
        loop: true,
        autoplay: true,
        path: `../assets/data/indicator.json`
      });

     // bodymovin.loadAnimation({
     //    container: document.querySelector(`.circles-animation`),
     //    renderer: `svg`,
     //    loop: false,
     //    autoplay: true,
     //    path: `../assets/data/circles.json`
     //  });
    // let $container = document.querySelector('.work-frame');
    //
    // // Create a manager to manager the element
    // let manager = new Hammer.Manager($container);
    //
    // // Create a recognizer
    // let Swipe = new Hammer.Swipe();
    //
    // // Add the recognizer to the manager
    // manager.add(Swipe);
    // // Declare global variables to swiped correct distance
    // let deltaX = 0;
    // let deltaY = 0;
    //
    // manager.on('swipe', function(e) {
    //   deltaX = deltaX + e.deltaX;
    //   let direction = e.offsetDirection;
    //   if(direction === 8) {
    //     if (this.state.case !== this.state.data.length) {
    //       if (this.state.case + 1 <= this.state.data.length - 1) {
    //         this.setState({ case: this.state.case + 1 });
    //         workPage();
    //       }
    //     }
    //   }
    //
    //   if(direction === 16) {
    //     if (this.state.case - 1 >= 0) {
    //       this.setState({case: this.state.case - 1});
    //       workPage();
    //     }
    //   }
    // });

    document.querySelector(`.name`).style.color = '#3B3B3B';
    document.addEventListener("wheel", this.scrollEvent, {passive: true}),
    document.addEventListener("mousewheel", this.scrollEvent, {passive: true}),
    document.addEventListener("DOMMouseScroll", this.scrollEvent, {passive: true}),
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if(keyName==='ArrowDown') this.keyDown()
      if(keyName==='ArrowUp') this.keyUp()
    })

    const selectedOption = localStorage.getItem('currentCase') || 0;
    if (selectedOption !== 'NaN') this.setState({case: parseInt(selectedOption) })
    document.querySelector(`.name`).style.color = '#3B3B3B';
    document.querySelector(`.work-frame__indicator`).addEventListener(`click`, this.navigationClickedActive);
  };

  componentWillUnmount() {
    document.removeEventListener('wheel', this.scrollEvent, {passive: true});
    document.removeEventListener('mousewheel', this.scrollEvent, {passive: true});
    document.removeEventListener('DOMMouseScroll', this.scrollEvent, {passive: true});
    if (timeOut !== null) clearTimeout(timeOut);
    localStorage.setItem('currentCase', this.state.case);
  };

  keyDown = () => {
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

  generateLister() {
    // let rightFrame = document.querySelector(`.work-frame`).getBoundingClientRect().right;
    window.addEventListener('resize', this.generateLister);
    // rightFrame = rightFrame;
    // let value = rightFrame.toString() + 'px';
    // console.log(value);
    // document.querySelector(`.work-frame__indicator`).style.left = value;
  }

	checkStatus = (response) => {
		if (!response.ok) throw Error(response.statusText);
    return response;
	};

  // navigationClickedActive() {
  //   navigationActive = true;
  //   console.log(navigationActive);
  //   document.querySelector(`.overlay`).classList.add(`active`);
  //   var para = document.createElement("a");
  //   var node = document.createTextNode("X");
  //   para.appendChild(node);
  //   var element = document.querySelector(".work-frame__indicator-p");
  //   element.appendChild(para);
  //   document.querySelector(`.current`).style.visibility = "hidden";
  //   document.querySelector(`.slash`).style.visibility = "hidden";
  //   document.querySelector(`.total`).style.visibility = "hidden";
  //   document.querySelector(`.work-frame__indicator-p`).classList.add(`work-frame__indicator-p_active`);
  // }

  renderHeaderImage(project) {
    return (<img className={`content-summary__image-style ${project[this.state.case].mobile ? new String("mobile") : null}`} src={`./assets/img/${project[this.state.case].name}.png`} alt="Vertigo" />)
  }

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
              <span><Link to='/'>Yacine.</Link></span>
            </div>
          </nav>
        </header>
        <main>
        <div className="menu-overlay" >
          <nav className="overlay-menu">
            <ul>
              <li><Link to='/workdetail/0'>Vertigo</Link></li>
              <li><Link to='/workdetail/1'>Babeleir</Link></li>
              <li><Link to='/workdetail/2'>WePlant</Link></li>
              <li><Link to='/moreprojects'>More projects</Link></li>
            </ul>
          </nav>
        </div>

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
                  {project ? this.renderHeaderImage(project) : null}
                 </div>
                </div>
              </section>


              <div className="content-info">
                <div className="content-info__role">
                  <p className="content-info__title">
                    What
                  </p>
                  <p className="content-info__body">
                    {
                        project ? project[this.state.case].role : null
                    }
                  </p>
                </div>
                <div className="content-info__agency">
                  <p className="content-info__title">
                    For who
                  </p>
                  <p className="content-info__body">
                    {
                      project ? project[this.state.case].agency : null
                    }
                  </p>
                </div>
                  <div className="content-info__year">
                    <p className="content-info__title">
                      When
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
            <div className="indicator_anim"></div>
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
                  <Link to={`/workdetail/${this.state.case}`}>Check it out</Link>
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
