import React                                         from 'react';
import ReactDOM                                      from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {Provider}                                    from 'react-redux';
import {createStore, applyMiddleware}                from 'redux';
import createLogger                                  from 'redux-logger';
import reducer                                       from './reducers/reducer';
import App                                           from './containers/AppContainer';
import Home                                          from './components/Home';
import FabricNew                                     from './containers/fabrics/FabricNewContainer';
import FabricEdit                                    from './containers/fabrics/FabricEditContainer';
import FabricList                                    from './containers/fabrics/FabricListContainer';
import FabricDetail                                  from './containers/fabrics/FabricDetailContainer';

import ClientNew                                     from './containers/clients/ClientNewContainer';
import ClientEdit                                    from './containers/clients/ClientEditContainer'
import ClientList                                    from './containers/clients/ClientListContainer';
import ClientDetail                                  from './containers/clients/ClientDetailContainer';

import authMiddleware                                from './middleware/authMiddleware';
import fabricsMiddleware                             from './middleware/fabricsMiddleware';
import clientsMiddleware                             from './middleware/clientsMiddleware';
import { Map, fromJS }                               from 'immutable';
import { syncHistoryWithStore, routerReducer }       from 'react-router-redux';
import { removeMessage }                             from './actions/messagesActions';
import { createFabricSuccess, getFabricRequest, getFabricsRequest }     from './actions/fabricsActions';
import { createClientSuccess, getClientRequest, getClientsRequest }     from './actions/clientsActions';

const NotFound = () => (
  <h1> This page was not found! </h1>
)

let token = localStorage.getItem('token') || null
const logger = createLogger();
const INIT_STATE = fromJS({ auth: { isAuthenticated: (token ? true : false), token, loading: false }, fabrics: {}, clients: {} });
const store = createStore(reducer, INIT_STATE, applyMiddleware(logger, authMiddleware, fabricsMiddleware, clientsMiddleware));

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
                <Route path="/fabrics" 
                        component={FabricList} 
                        onEnter={ () => store.dispatch(getFabricsRequest()) } 
                        onChange={ () => store.dispatch(getFabricsRequest()) }/>
                <Route path="/fabrics/new" component={FabricNew} onEnter={ () => store.dispatch(createFabricSuccess()) } />
                <Route path="/fabrics/:id/edit" component={FabricEdit} onEnter={(route) => store.dispatch(getFabricRequest(route.params.id))} />
                <Route path="/fabrics/:id" component={FabricDetail} onEnter={(route) => store.dispatch(getFabricRequest(route.params.id))} />
                
                <Route path="/clients/new" component={ClientNew} onEnter={ () => store.dispatch(createClientSuccess()) } />
                <Route path="/clients" 
                        component={ClientList} 
                        onEnter={ () => store.dispatch(getClientsRequest()) } 
                        onChange={ () => store.dispatch(getClientsRequest()) }/>
                <Route path="/clients/:id" component={ClientDetail} onEnter={(route) => store.dispatch(getClientRequest(route.params.id))} />
                <Route path="/clients/:id/edit" component={ClientEdit} onEnter={(route) => store.dispatch(getClientRequest(route.params.id))} />

                <Route path='*' component={NotFound} />
               </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);