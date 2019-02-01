import React from "react"
import ReactDOM from "react-dom"
import { createHashHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import Dashboard from "layouts/Dashboard/Dashboard.jsx"

import "assets/css/material-dashboard-react.css"

import indexRoutes from "routes/index.jsx"
import { rootEpic, database_worker, libsbmljs_worker } from 'epics.js'
import { dispatchQuery, getModelInfo } from 'actions.js'
import { SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, GET_MODEL_INFO, SET_MODEL_INFO, SET_MODEL_PROPERTIES, LIBSBML_LOADED, SET_MODEL_SRC, VALIDATE_MODEL, SET_MODEL_VALIDATION_RESULTS } from 'constants.js'
import { setModelSourceEpic } from 'epics.js'

import 'react-virtualized/styles.css'

const hist = createHashHistory()

const query = (state = {entered_query: '', results: []}, action) => {
  switch (action.type) {
    case SET_ENTERED_QUERY:
      return {entered_query: action.query, results: state.results}
    case DISPATCH_QUERY:
      database_worker.postMessage(dispatchQuery(action.query))
      return {entered_query: action.query, results: state.results}
    case QUERY_RESULTS:
      return {entered_query: state.entered_query, results: action.results}
    default:
      return state
  }
}

const model = (state = {
      model: '', title: '', origin: '', origin_str: '',
      // libsbml_loaded: false,
      sbml_model_token: '', n_reactions: -1, n_species: -1, n_compartments: -1, n_events: -1, n_functions: -1, n_rules: -1,
      model_source: '',
      validating_model: '', validated_model: '', model_is_valid: false, model_consistency_errors: [],
    }, action) => {
  switch (action.type) {
    case GET_MODEL_INFO:
      database_worker.postMessage(getModelInfo(action.model))
      return state
    case SET_MODEL_INFO:
      return Object.assign({}, state, {
        model: action.model,
        title: action.title,
        origin: action.origin,
        origin_str: action.origin +
        (action.origin === 'BioModels' ?
          (action.curated === 'Yes' ? ' (curated)' : ' (non-curated)')
         : '')
      })
    // case SET_MODEL_SRC:
      // console.log('set model source', action.model, action.source)
      // libsbmljs_worker.postMessage(action)
      // return state
    case SET_MODEL_PROPERTIES:
      return Object.assign({}, state, {
        sbml_model_token: action.sbml_model_token,
        n_reactions: action.n_reactions,
        n_species: action.n_species,
        n_compartments: action.n_compartments,
        n_events: action.n_events,
        n_functions: action.n_functions,
        n_rules: action.n_rules,
      })
    case LIBSBML_LOADED:
      // return Object.assign({}, state, {libsbml_loaded: true})
      return state
    case SET_MODEL_SRC:
      return Object.assign({}, state, {model_source: action.source})
    case VALIDATE_MODEL:
      libsbmljs_worker.postMessage(Object.assign({}, action, {source: state.model_source}))
      return Object.assign({}, state, {validating_model: action.model})
    case SET_MODEL_VALIDATION_RESULTS:
      return Object.assign({}, state, {validated_model: action.model, model_is_valid: action.is_valid, model_consistency_errors: action.consistency_errors})
    default:
      return state
  }
}

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  combineReducers({
    router: connectRouter(hist),
    query,
    model,
  }),
  compose(applyMiddleware(routerMiddleware(hist), thunk, epicMiddleware))
)

hist.listen((location, action) => {
  if (action === 'POP') {
    const query = new URLSearchParams(hist.location.search).get('q')
    if (query) {
      store.dispatch(dispatchQuery(query))
      return
    }
    const model = new URLSearchParams(hist.location.search).get('m')
    if (model) {
      store.dispatch(getModelInfo(model))
      return
    }
  }
})
window.onload = () => {
  const query = new URLSearchParams(hist.location.search).get('q')
  if (query) {
    store.dispatch(dispatchQuery(query))
    return
  }
  const model = new URLSearchParams(hist.location.search).get('m')
  if (model) {
    store.dispatch(getModelInfo(model))
    return
  }
}

database_worker.addEventListener('message', function(e) {
  // the result should be an action - dispatch it
  store.dispatch(e.data)
}, false);

libsbmljs_worker.addEventListener('message', function(e) {
  // the result should be an action - dispatch it
  store.dispatch(e.data)
})

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={hist}>
      <Switch>
        <Route path='/' component={Dashboard} key='dashboard' />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
