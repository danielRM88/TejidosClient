import React                                         from 'react';
import ReactDOM                                      from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {Provider}                                    from 'react-redux';
import {createStore, applyMiddleware}                from 'redux';
import createLogger                                  from 'redux-logger';
import reducer                                       from './reducers/reducer';
import App                                           from './containers/AppContainer';
import Home                                          from './components/Home';
import FabricForm                                    from './containers/fabrics/FabricFormContainer';
import FabricList                                    from './components/fabrics/FabricList';
import FabricDetail                                  from './components/fabrics/FabricDetail';
import authMiddleware                                from './middleware/authMiddleware';
import fabricsMiddleware                             from './middleware/fabricsMiddleware';
import { Map, fromJS }                               from 'immutable';

const NotFound = () => (
  <h1> This page was not found! </h1>
)

let token = localStorage.getItem('token') || null
const logger = createLogger();
const INIT_STATE = fromJS({ auth: { isAuthenticated: (token ? true : false), token, loading: false }, fabrics: {} });
const store = createStore(reducer, INIT_STATE, applyMiddleware(logger, authMiddleware, fabricsMiddleware));

const routes = <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/fabrics" component={FabricList} />
                <Route path="/fabrics/new" component={FabricForm} />
                <Route path="/fabrics/:id/edit" component={FabricForm} />
                <Route path="/fabrics/:id" component={FabricDetail} />
                <Route path='*' component={NotFound} />
               </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);