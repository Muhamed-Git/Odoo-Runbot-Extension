// Library
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './modules/base/redux/reducers.js';

// Components
import App from './App.js';

const store = createStore(combineReducers,window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
