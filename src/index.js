import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import App from './App';
import configureStore from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(
  <HashRouter>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </HashRouter>
  ,
  document.getElementById('root')
);