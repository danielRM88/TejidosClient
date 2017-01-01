import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducer';
import App from './components/App';
import Container from './components/Container';
import Home from './components/Home';
import Login from './components/Login';
import authService from './services/authService';
import {Map} from 'immutable';

// const pair = ['Trainspotting', '28 Days Later'];

const logger = createLogger();
const INIT_STATE = Map({ auth: Map({ isAuthenticated: false }) });
const store = createStore(reducer, INIT_STATE, applyMiddleware(logger, authService));

let token = localStorage.getItem('token') || null

if(token) {
  store.dispatch({
    type: 'LOGIN_SUCCESS',
    auth: {
      isAuthenticated: true,
      token: token
    }
  });
}

const routes = <Route component={Container} isAuthenticated={token ? true : false} token={token}>
                  <Route component={App}>
                    <Route path="/" component={Home} />
                  </Route>;
               </Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  // <Provider store={store}>
  //   <App isAuthenticated={false}/>
  // </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <App isAuthenticated="false"/>,
//   document.getElementById('app')
// );