import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {

  render() {
    return (
      <header>
        <nav>
          <div className="name">
            <span><Link to='/'>Yacine.</Link></span>
          </div>
        </nav>
      </header>
    );
  };
};


export default Header;
