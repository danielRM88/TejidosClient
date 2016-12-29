import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducer';
import AppRouter from './components/AppRouter';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';

// const pair = ['Trainspotting', '28 Days Later'];

const logger = createLogger();
const INIT_STATE = { auth: { isAuthenticated: false } }
const store = createStore(reducer, INIT_STATE, applyMiddleware(logger));
// store.dispatch({
//   type: 'SET_STATE',
//   state: {
//     auth: {
//       isAuthenticated: false
//     }
//   }
// });

const routes = <Route component={AppRouter} store={store} isAuthenticated={false}>
  <Route path="/" component={App} />
</Route>;

ReactDOM.render(
  // <Provider store={store}>
  //   <Router history={hashHistory}>{routes}</Router>
  // </Provider>,
  <App dispatch={store.dispatch} isAuthenticated={false}/>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <App isAuthenticated="false"/>,
//   document.getElementById('app')
// );