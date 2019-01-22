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
import { SET_ENTERED_QUERY, DISPATCH_QUERY } from 'constants.js'
// import { idx } from 'database.worker.js'
import Worker from 'database.worker.js';

console.log('construct worker')
const worker = new Worker()
console.log(worker)

worker.onmessage = function (event) {
  console.log('msg ffrom worker')
}
 worker.postMessage(dispatchQuery('aquery'))
// worker.postMessage('yello')
// setTimeout(
// worker.postMessage(dispatchQuery('aquery'))
// , 1000)

const hist = createHashHistory();

const query = (state = {entered_query: '', returned_query: ''}, action) => {
  switch (action.type) {
    case SET_ENTERED_QUERY:
      return {entered_query: action.query, returned_query: state.returned_query}
    case DISPATCH_QUERY:
      hist.push('/search?q='+action.query)
      return {entered_query: null, returned_query: state.returned_query}
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
