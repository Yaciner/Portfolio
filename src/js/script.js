import React from 'react';
import {render} from 'react-dom';
import App from './container/App';

const init = () => {
  console.log("You can find the code here: http://www.github.com/Yaciner/portfolio");
  render(
    <App />,
    document.querySelector(`.react-mount`),
  );

};

init();
