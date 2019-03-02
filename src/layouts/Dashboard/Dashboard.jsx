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
import LandingView from "views/Dashboard/LandingView.jsx"
import { setEnteredQuery, dispatchQuery, setActiveModel, getModelInfo, validateModel, setModelSource, setDraggingModel, setValidationOptions, resetValidation } from 'actions'

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
    displayedModelTitle: state.model.title,
    displayedModelOrigin: state.model.origin,
    displayedModelOriginStr: state.model.origin_str,
    sbmlModelToken: state.model.sbml_model_token,
    sbmlModelNumReactions: state.model.n_reactions,
    sbmlModelNumSpecies: state.model.n_species,
    sbmlModelNumCompartments: state.model.n_compartments,
    sbmlModelNumEvents: state.model.n_events,
    sbmlModelNumFunctions: state.model.n_functions,
    sbmlModelNumRules: state.model.n_rules,
    sbmlModelTreeView: state.model.tree_view,
    validatingModel: state.model.validating_model,
    validatedModel: state.model.validated_model,
    modelIsValid: state.model.model_is_valid,
    modelConsistencyErrors: state.model.model_consistency_errors,
    errorsModel: state.model.errors_model,
    errors: state.model.errors,
    expiredModel: state.model.expired_model,
    draggingModel: state.ui.dragging,
    enableGeneralChecks: state.model.general_checks,
    enableIdentifierChecks: state.model.identifier_checks,
    enableUnitsChecks: state.model.units_checks,
    enableMathmlChecks: state.model.mathml_checks,
    enableSboChecks: state.model.sbo_checks,
    enableOverdeterminedChecks: state.model.overdetermined_checks,
    enableModelingPracticeChecks: state.model.modeling_practice_checks,
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
      dispatch(push('/view?m='+model+'&src=web'))
      dispatch(getModelInfo(model))
    },
    setUploadedModel: (model) => {
      dispatch(push('/view?m='+model+'&src=upload'))
    },
    validateModel: (model, general_checks, identifier_checks, units_checks, mathml_checks, sbo_checks, overdetermined_checks, modeling_practice_checks) => {
      dispatch(validateModel(model, '', general_checks, identifier_checks, units_checks, mathml_checks, sbo_checks, overdetermined_checks, modeling_practice_checks))
    },
    resetValidation: () => {
      dispatch(resetValidation())
    },
    setModelSource: (model,src) => {
      dispatch(setModelSource(model,src))
    },
    setDraggingModel: (value) => {
      dispatch(setDraggingModel(value))
    },
    setValidationOptions: (general_checks, identifier_checks, units_checks, mathml_checks, sbo_checks, overdetermined_checks, modeling_practice_checks) => {
      dispatch(setValidationOptions(general_checks, identifier_checks, units_checks, mathml_checks, sbo_checks, overdetermined_checks, modeling_practice_checks))
    },
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
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    // properties
    const { classes, query, searchResultsEnabled, searchResults, location,
      displayedModel, displayedModelTitle, displayedModelOrigin,
      sbmlModelToken, sbmlModelNumReactions, sbmlModelNumSpecies,sbmlModelNumCompartments,
      sbmlModelNumEvents, sbmlModelNumFunctions, sbmlModelNumRules, sbmlModelTreeView,
      validateModel, resetValidation, validatingModel, validatedModel, modelIsValid, modelConsistencyErrors,
      errorsModel, errors,
      expiredModel, draggingModel,
      enableGeneralChecks, enableIdentifierChecks, enableUnitsChecks, enableMathmlChecks, enableSboChecks, enableOverdeterminedChecks, enableModelingPracticeChecks,
      setValidationOptions,
       ...rest } = this.props
    // action dispatchers
    const { setEnteredQuery, dispatchQuery, setActiveModel, setUploadedModel, setModelSource, setDraggingModel } = this.props
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
                  modelWasUploaded={new URLSearchParams(location.search).get('src') === 'upload'}
                  errorsModel={errorsModel}
                  errors={errors}
                  displayedModel={displayedModel}
                  displayedModelTitle={displayedModelTitle}
                  displayedModelOrigin={displayedModelOrigin}
                  sbmlModelToken={sbmlModelToken}
                  sbmlModelNumReactions={sbmlModelNumReactions}
                  sbmlModelNumSpecies={sbmlModelNumSpecies}
                  sbmlModelNumCompartments={sbmlModelNumCompartments}
                  sbmlModelNumEvents={sbmlModelNumEvents}
                  sbmlModelNumFunctions={sbmlModelNumFunctions}
                  sbmlModelNumRules={sbmlModelNumRules}
                  sbmlModelTreeView={sbmlModelTreeView}
                  validateModel={validateModel}
                  resetValidation={resetValidation}
                  validatingModel={validatingModel}
                  validatedModel={validatedModel}
                  modelIsValid={modelIsValid}
                  modelConsistencyErrors={modelConsistencyErrors}
                  expiredModel={expiredModel}
                  setValidationOptions={setValidationOptions}
                  enableGeneralChecks={enableGeneralChecks}
                  enableIdentifierChecks={enableIdentifierChecks}
                  enableUnitsChecks={enableUnitsChecks}
                  enableMathmlChecks={enableMathmlChecks}
                  enableSboChecks={enableSboChecks}
                  enableOverdeterminedChecks={enableOverdeterminedChecks}
                  enableModelingPracticeChecks={enableModelingPracticeChecks}
                  />}
                  key="/view"/>
                <Route path="/" render={props =>
                  <LandingView
                    setUploadedModel={setUploadedModel}
                    setModelSource={setModelSource}
                    setDraggingModel={setDraggingModel}
                    draggingModel={draggingModel}
                    key="/landing"/>} />
              </Switch>
            </div>
          </div>
          <Footer/>
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
