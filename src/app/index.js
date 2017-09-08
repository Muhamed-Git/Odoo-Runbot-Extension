import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './reducers';

const store = createStore(combineReducers,window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
