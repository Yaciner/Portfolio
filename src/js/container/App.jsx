import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from '../components/Homepage';
import Work from '../components/Work';
import About from '../components/About';
import Detail from '../components/WorkDetail';
import More from '../components/OtherProjects';

class App extends Component {

  renderHome = () => {
    return <Home />;
  }

  // renderDetail = () => {
  //   return <Detail />;
  // }

  renderDetailMetId = ({match}) => {
    const {_id} = match.params;
    return <Detail _id={_id} />;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={this.renderHome} />
          <Route exact path='/work' component={Work} />
          <Route exact path='/about' component={About} />
          <Route exact path='/moreprojects' component={More} />
          <Route exact path='/workdetail/:_id' render={this.renderDetailMetId} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
