import React from "react"
import ReactDOM from "react-dom"
import { createHashHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import "assets/css/material-dashboard-react.css";

import indexRoutes from "routes/index.jsx";

const hist = createHashHistory();

const query = (state = {entered_query: '', returned_query: ''}, action) => {
  switch (action.type) {
    case 'SET_ENTERED_QUERY':
      console.log('set entered query', action.query)
      return {entered_query: action.query, returned_query: state.returned_query}
    default:
      return state
  }
}

const store = createStore(combineReducers({
  query
}))

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
