import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {workPage} from '../../lib/animateElements';
import bodymovin from 'lottie-web';
let supportsWheel = !1;
let delta = 0;
const mobile = `mobile`;
let timeOut = null;
let clickState = 0;
let passiveSupported = false;

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
    // console.log(project[this.state.case]);
    document.querySelector(`.work-frame__button`).addEventListener(`mouseenter`, this.handleMouseEnter);
    document.querySelector(`.work-frame__button`).addEventListener(`mouseleave`, this.handleMouseOut);
    document.querySelector(`.work-frame__indicator`).addEventListener(`click`, this.toggleElement);
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


  try {
    var options = {
      get passive() { // This function will be called when the browser
                      //     attempts to access the passive property.
        passiveSupported = true;
      }
    };

    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch(err) {
    passiveSupported = false;
  }

    document.querySelector(`.name`).style.color = '#3B3B3B';
    document.addEventListener(`wheel`, this.scrollEvent, passiveSupported ? { passive: true } : false);
    document.addEventListener(`mousewheel`, this.scrollEvent, passiveSupported ? { passive: true } : false);
    document.addEventListener(`DOMMouseScroll`,passiveSupported ? { passive: true } : false);
    document.addEventListener(`keydown`, (event) => {
      const keyName = event.key;
      if(keyName==='ArrowDown') this.keyDown()
      if(keyName==='ArrowUp') this.keyUp()
    })

    const selectedOption = localStorage.getItem('currentCase') || 0;
    if (selectedOption !== 'NaN') this.setState({case: parseInt(selectedOption, 10) })
    document.querySelector(`.name`).style.color = '#3B3B3B';
    document.querySelector(`.work-frame__indicator`).addEventListener(`click`, this.navigationClickedActive);
  };

  componentWillUnmount() {
    document.removeEventListener('wheel', this.scrollEvent, passiveSupported ? { passive: true } : false);
    document.removeEventListener('mousewheel', this.scrollEvent, passiveSupported ? { passive: true } : false);
    document.removeEventListener('DOMMouseScroll', this.scrollEvent, passiveSupported ? { passive: true } : false);
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
    if (`wheel` === e.type) supportsWheel = !0;
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

  renderHeaderImage(project) {
    return (<img className={`content-summary__image-style ${project[this.state.case].mobile ? mobile : null}`} src={`./assets/img/${project[this.state.case].name}.png`} alt="Vertigo" />)
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
