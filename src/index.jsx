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
import FabricDetail                                  from './containers/fabrics/FabricDetailContainer';
import authMiddleware                                from './middleware/authMiddleware';
import fabricsMiddleware                             from './middleware/fabricsMiddleware';
import { Map, fromJS }                               from 'immutable';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { removeMessage } from './actions/messagesActions';
import { createFabricSuccess, getFabricRequest } from './actions/fabricsActions';

const NotFound = () => (
  <h1> This page was not found! </h1>
)

let token = localStorage.getItem('token') || null
const logger = createLogger();
const INIT_STATE = fromJS({ auth: { isAuthenticated: (token ? true : false), token, loading: false }, fabrics: {} });
const store = createStore(reducer, INIT_STATE, applyMiddleware(logger, authMiddleware, fabricsMiddleware));

/* Create enhanced history object for router */
const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('routing'); // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: createSelectLocationState()
});

history.listen(() => { store.dispatch(removeMessage()) });

const routes = <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/fabrics" component={FabricList} />
                <Route path="/fabrics/new" component={FabricForm} onEnter={ () => store.dispatch(createFabricSuccess()) } />
                <Route path="/fabrics/:id/edit" component={FabricForm} onEnter={(route) => store.dispatch(getFabricRequest(route.params.id))} />
                <Route path="/fabrics/:id" component={FabricDetail} onEnter={(route) => store.dispatch(getFabricRequest(route.params.id))} />
                <Route path='*' component={NotFound} />
               </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);