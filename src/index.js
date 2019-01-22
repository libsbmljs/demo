import React from "react"
import ReactDOM from "react-dom"
import { createHashHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import "assets/css/material-dashboard-react.css"

import indexRoutes from "routes/index.jsx"
import { rootEpic } from 'epics.js'
import { dispatchQuery } from 'actions.js'
import { SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS } from 'constants.js'

import Worker from 'database.worker.js';

const worker = new Worker()

const hist = createHashHistory();

const query = (state = {entered_query: '', results: []}, action) => {
  switch (action.type) {
    case SET_ENTERED_QUERY:
      return {entered_query: action.query, results: state.results}
    case DISPATCH_QUERY:
      hist.push('/search?q='+action.query)
      worker.postMessage(dispatchQuery(action.query)) // TODO: put in history listener
      return {entered_query: null, results: state.results}
    case QUERY_RESULTS:
      return {entered_query: state.entered_query, results: action.results}
    default:
      return state
  }
}

const epicMiddleware = createEpicMiddleware()

const store = createStore(combineReducers({
    query
  }),
  applyMiddleware(epicMiddleware)
)

worker.addEventListener('message', function(e) {
  // the result should be an action - dispatch it
  store.dispatch(e.data)
}, false);

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
