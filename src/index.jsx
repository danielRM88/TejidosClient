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

import SupplierNew                                   from './containers/suppliers/SupplierNewContainer';
import SupplierEdit                                  from './containers/suppliers/SupplierEditContainer'
import SupplierList                                  from './containers/suppliers/SupplierListContainer';
import SupplierDetail                                from './containers/suppliers/SupplierDetailContainer';

import PurchaseNew                                   from './containers/purchases/PurchaseNewContainer';
import PurchaseEdit                                  from './containers/purchases/PurchaseEditContainer';
import PurchaseList                                  from './containers/purchases/PurchaseListContainer';

import InvoiceNew                                    from './containers/invoices/InvoiceNewContainer';
import InvoiceEdit                                   from './containers/invoices/InvoiceEditContainer';
import InvoiceList                                   from './containers/invoices/InvoiceListContainer';

import StockList                                     from './containers/stocks/StockListContainer';

import authMiddleware                                from './middleware/authMiddleware';
import fabricsMiddleware                             from './middleware/fabricsMiddleware';
import clientsMiddleware                             from './middleware/clientsMiddleware';
import suppliersMiddleware                           from './middleware/suppliersMiddleware';
import purchasesMiddleware                           from './middleware/purchasesMiddleware';
import invoicesMiddleware                            from './middleware/invoicesMiddleware';
import stocksMiddleware                              from './middleware/stocksMiddleware';
import { Map, fromJS }                               from 'immutable';
import { syncHistoryWithStore, routerReducer }       from 'react-router-redux';
import { removeMessage }                             from './actions/messagesActions';
import { createFabricSuccess, getFabricRequest, getFabricsRequest }     from './actions/fabricsActions';
import { createClientSuccess, getClientRequest, getClientsRequest }     from './actions/clientsActions';
import { createSupplierSuccess, getSupplierRequest, getSuppliersRequest }     from './actions/suppliersActions';
import { createPurchaseSuccess, resetPurchase, getPurchaseRequest, getPurchasesRequest }     from './actions/purchasesActions';
import { createInvoiceSuccess, getInvoiceRequest, getInvoicesRequest }     from './actions/invoicesActions';
import { getStocksRequest }     from './actions/stocksActions';

const NotFound = () => (
  <h1> This page was not found! </h1>
)

let token = localStorage.getItem('token') || null
const logger = createLogger();
const INIT_STATE = fromJS({ auth: { isAuthenticated: (token ? true : false), token, loading: false }, 
                            fabrics: {}, 
                            clients: {}, 
                            suppliers: {}, 
                            purchases: {},
                            invoices: {},
                            stocks: {},
                            messages: {list: []} });
const store = createStore(reducer, INIT_STATE, applyMiddleware(logger, 
                                                                authMiddleware, 
                                                                fabricsMiddleware, 
                                                                clientsMiddleware, 
                                                                suppliersMiddleware, 
                                                                purchasesMiddleware,
                                                                invoicesMiddleware,
                                                                stocksMiddleware));

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

                <Route path="/suppliers/new" component={SupplierNew} onEnter={ () => store.dispatch(createSupplierSuccess()) } />
                <Route path="/suppliers" 
                        component={SupplierList} 
                        onEnter={ () => store.dispatch(getSuppliersRequest()) } 
                        onChange={ () => store.dispatch(getSuppliersRequest()) }/>
                <Route path="/suppliers/:id" component={SupplierDetail} onEnter={(route) => store.dispatch(getSupplierRequest(route.params.id))} />
                <Route path="/suppliers/:id/edit" component={SupplierEdit} onEnter={(route) => store.dispatch(getSupplierRequest(route.params.id))} />

                <Route path="/purchases" 
                        component={PurchaseList} 
                        onEnter={ () => store.dispatch(getPurchasesRequest()) } 
                        onChange={ () => store.dispatch(getPurchasesRequest()) }/>
                <Route path="/purchases/new" component={PurchaseNew} onEnter={ () => store.dispatch(createPurchaseSuccess()) }/>
                <Route path="/purchases/:id/edit" component={PurchaseEdit} onEnter={(route) => store.dispatch(getPurchaseRequest(route.params.id))} />

                <Route path="/invoices" 
                        component={InvoiceList} 
                        onEnter={ () => store.dispatch(getInvoicesRequest()) } 
                        onChange={ () => store.dispatch(getInvoicesRequest()) }/>
                <Route path="/invoices/new" component={InvoiceNew} onEnter={ () => store.dispatch(createInvoiceSuccess()) }/>
                <Route path="/invoices/:id/edit" component={InvoiceEdit} onEnter={(route) => store.dispatch(getInvoiceRequest(route.params.id))} />

                <Route path="/stocks" 
                        component={StockList} 
                        onEnter={ () => store.dispatch(getStocksRequest()) } 
                        onChange={ () => store.dispatch(getStocksRequest()) }/>

                <Route path='*' component={NotFound} />
               </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);