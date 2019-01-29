/* eslint-disable */
import React from "react"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { Switch, Route, Redirect } from "react-router-dom"
import { push } from 'connected-react-router'
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar"
import "perfect-scrollbar/css/perfect-scrollbar.css"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// core components
import Header from "components/Header/Header.jsx"
import Footer from "components/Footer/Footer.jsx"
import Sidebar from "components/Sidebar/Sidebar.jsx"
import SearchView from "views/Dashboard/SearchView.jsx"
import ModelView from "views/Dashboard/ModelView.jsx"
import { setEnteredQuery, dispatchQuery, setActiveModel, getModelInfo } from 'actions'

import dashboardRoutes from "routes/dashboard.jsx"

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"

import image from "assets/img/sidebar-2.jpg"
import logo from "assets/img/reactlogo.png"

const mapStateToProps = (state) => {
  return {
    query: state.query.entered_query,
    searchResultsEnabled: !state.query.entered_query,
    searchResults: state.query.results,
    displayedModel: state.model.model,
    displayedModelOrigin: state.model.origin,
    displayedModelOriginStr: state.model.origin_str,
    displayedModeNumReactions: state.model.n_reactions,
    displayedModeNumSpecies: state.model.n_species,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEnteredQuery: query => {
      dispatch(setEnteredQuery(query))
    },
    dispatchQuery: query => {
      dispatch(dispatchQuery(query))
    },
    setActiveModel: (model) => {
      dispatch(push('/view?m='+model))
      dispatch(getModelInfo(model))
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    // properties
    const { classes, query, searchResultsEnabled, searchResults, location,
      displayedModel, displayedModelOrigin, displayedModeNumReactions, displayedModeNumSpecies,
       ...rest } = this.props
    // action dispatchers
    const { setEnteredQuery, dispatchQuery, setActiveModel } = this.props
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            setEnteredQuery={setEnteredQuery}
            dispatchQuery={dispatchQuery}
            query={query}
            searchResults={searchResults}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.mainContainer}>
              <Switch>
                <Route path="/search" render={props =>
                  <SearchView
                    enabled={searchResultsEnabled}
                    searchResults={searchResults}
                    setActiveModel={setActiveModel}/>} key="/search" />

                <Route path="/view" render={props =>
                  <ModelView
                  model={new URLSearchParams(location.search).get('m')}
                  displayedModel={displayedModel}
                  displayedModelOrigin={displayedModelOrigin}
                  displayedModeNumReactions={displayedModeNumReactions}
                  displayedModeNumSpecies={displayedModeNumSpecies}
                  />}
                  key="/view"/>
                <Redirect from="/" to="/search" key="root-redirect" />
              </Switch>
            </div>
          </div>
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default withStyles(dashboardStyle)(ConnectedApp);
