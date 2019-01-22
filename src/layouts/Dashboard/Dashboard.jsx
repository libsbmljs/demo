/* eslint-disable */
import React from "react"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { Switch, Route, Redirect } from "react-router-dom"
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
import {setEnteredQuery, dispatchQuery} from 'actions'

import dashboardRoutes from "routes/dashboard.jsx"

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"

import image from "assets/img/sidebar-2.jpg"
import logo from "assets/img/reactlogo.png"

const switchRoutes = (searchResultsEnabled, searchResults) => (
  <Switch>
    <Route path="/search" render={props => < SearchView enabled={searchResultsEnabled} searchResults={searchResults} />} key="/search" />
    <Redirect from="/" to="/search" key="root-redirect" />
  </Switch>
);

const mapStateToProps = (state) => {
  console.log('searchResults', state.query.results)
  return {
    query: state.query.entered_query,
    searchResultsEnabled: !state.query.entered_query,
    searchResults: state.query.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEnteredQuery: query => {
      dispatch(setEnteredQuery(query))
    },
    dispatchQuery: query => {
      dispatch(dispatchQuery(query))
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
    const { classes, setEnteredQuery, dispatchQuery, query, searchResultsEnabled, searchResults, location, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            setEnteredQuery={setEnteredQuery}
            dispatchQuery={dispatchQuery}
            query={query || new URLSearchParams(location.search).get('q')}
            searchResults={searchResults}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(searchResultsEnabled, searchResults)}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes(searchResultsEnabled, searchResults)}</div>
          )}
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
