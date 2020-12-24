import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from '../components/Homepage';
import Work from '../components/Work';
import About from '../components/About';
import Detail from '../components/WorkDetail';
import More from '../components/OtherProjects';

class App extends Component {
  //
  // history = createHashHistory({
  //   basename: "", // The base URL of the app (see below)
  //   hashType: "slash", // The hash type to use (see below)
  //   // A function to use to confirm navigation with the user (see below)
  //   getUserConfirmation: (message, callback) => callback(window.confirm(message)),
  // });


  renderHome = () => {
    return <Home />;
  }
  
  renderDetailMetId = ({match}) => {
    const {_id} = match.params;
    return <Detail _id={_id} />;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={this.renderHome} />
          <Route exact path='/work' component={Work} />
          <Route exact path='/about' component={About} />
          <Route exact path='/moreprojects' component={More} />
          <Route exact path='/workdetail/:_id' render={this.renderDetailMetId} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
