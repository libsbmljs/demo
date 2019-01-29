import React from "react"
import ReactDOM from "react-dom"
import { createHashHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter, push } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'

import "assets/css/material-dashboard-react.css"

import indexRoutes from "routes/index.jsx"
import { rootEpic, database_worker } from 'epics.js'
import { dispatchQuery, getModelInfo } from 'actions.js'
import { SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, GET_MODEL_INFO, SET_MODEL_INFO, SET_MODEL_SRC } from 'constants.js'

import libsbml from 'libsbml.js'
libsbml().then(() => {
  console.log('libsml.js loaded')
})

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

const model = (state = {model: '', origin: '', origin_str: ''}, action) => {
  switch (action.type) {
    case GET_MODEL_INFO:
      database_worker.postMessage(getModelInfo(action.model))
      return state
    case SET_MODEL_INFO:
      return {
        model: action.model,
        origin: action.origin,
        origin_str: action.origin +
        (action.origin === 'BioModels' ?
          (action.curated === 'Yes' ? ' (curated)' : ' (non-curated)')
         : '')
      }
    case SET_MODEL_SRC:
      console.log('set model source', action.model, action.source)
      return state
    default:
      return state
  }
}

const epicMiddleware = createEpicMiddleware()

const store = createStore(combineReducers({
    router: connectRouter(history),
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

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
