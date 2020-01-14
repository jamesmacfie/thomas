import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

if ((module as any).hot) {
  (module as any).hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
