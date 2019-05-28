import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import Hidden from "@material-ui/core/Hidden"
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from 'components/CustomButtons/Button.jsx'
import Checkbox from "@material-ui/core/Checkbox"
import Check from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"

import TreeView from './TreeView'
import CardSimulation from 'components/Cards/CardSimulation.jsx'

import "assets/css/material-dashboard-react.css"

import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx"

import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx"

const styles = {
  ...checkboxAdnRadioStyle,
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  primaryText: {
    color: primaryColor
  },
  disabled: {
    opacity: "0.75"
  },
  progress: {
    color: primaryColor,
    margin: '1 em',
  },
  cardWithMargin: {
    margin: '10 em',
  },
  errorList: {
    margin: '1em',
    marginTop: '3em',
  },
  errorListItem: {
    margin: '1em',
  },
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid #dddddd"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
};

class ModelView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.toggleValidationOpt = this.toggleValidationOpt.bind(this)
  }

  toggleValidationOpt(opt) {
    const {enableGeneralChecks, enableIdentifierChecks,
      enableUnitsChecks, enableMathmlChecks, enableSboChecks,
      enableOverdeterminedChecks, enableModelingPracticeChecks,
      setValidationOptions
    } = this.props

    const options = {
      general_checks: enableGeneralChecks,
      identifier_checks: enableIdentifierChecks,
      units_checks: enableUnitsChecks,
      mathml_checks: enableMathmlChecks,
      sbo_checks: enableSboChecks,
      overdetermined_checks: enableOverdeterminedChecks,
      modeling_practice_checks: enableModelingPracticeChecks,
    }
    options[opt] = !options[opt]
    setValidationOptions(options.general_checks, options.identifier_checks, options.units_checks, options.mathml_checks, options.sbo_checks, options.overdetermined_checks, options.modeling_practice_checks)
  }

  render() {
    const { classes, model, modelWasUploaded, displayedModel, displayedModelTitle, displayedModelOrigin, displayedModelOriginStr,
      sbmlModelToken, sbmlModelNumReactions, sbmlModelNumSpecies, sbmlModelNumCompartments,
      sbmlModelNumEvents, sbmlModelNumFunctions, sbmlModelNumRules, sbmlModelTreeView,
      validateModel, resetValidation, validatingModel, validatedModel, modelIsValid, modelConsistencyErrors,
      errors, errorsModel,
      expiredModel,
      // validation
      enableGeneralChecks, enableIdentifierChecks, enableUnitsChecks, enableMathmlChecks, enableSboChecks, enableOverdeterminedChecks, enableModelingPracticeChecks,
      // simulation
      addSliders, timeStart, timeStop, numTimepoints,
      isStochastic, numReplicates, enableMeanTrace,
      setSimulationOptions, simulateModel,
    } = this.props

    const showErrors = errors.length && (errorsModel === model)
    const showValidator = !showErrors

    const model_and_origin = showErrors ?
      'Errors Reading SBML' :
      (modelWasUploaded ?
        'Uploaded Model' :
        (displayedModel === model ?
          `${model} | ${displayedModelOrigin}` :
          model))

    const identifiers_org_uri = displayedModel === model ?
      (displayedModelOrigin === 'BioModels' ? 'http://identifiers.org/biomodels.db/' : 'http://identifiers.org/bigg.model/')+displayedModel
       : ''

    const validationOpts = [
      {
        option: 'units_checks',
        label: 'Checks for measurement units associated with quantities',
        enabled: enableUnitsChecks,
      },
      {
        option: 'identifier_checks',
        label: 'Identifier consistency checks',
        enabled: enableIdentifierChecks,
      },
      {
        option: 'mathml_checks',
        label: 'MathML syntax checks',
        enabled: enableMathmlChecks,
      },
      {
        option: 'sbo_checks',
        label: 'SBO consistency checks',
        enabled: enableSboChecks,
      },
      {
        option: 'overdetermined_checks',
        label: 'Check if the model is overdetermined',
        enabled: enableOverdeterminedChecks,
      },
      {
        option: 'modeling_practice_checks',
        label: 'Checks for best practices',
        enabled: enableModelingPracticeChecks,
      },
      {
        option: 'general_checks',
        label: 'General SBML consistency checks',
        enabled: enableGeneralChecks,
      },
    ]

    return (
      <GridContainer style={{minHeight:'calc(100vh - 240px)'}}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color={showErrors ? 'danger' : 'primary'}>
              <h4 className={classes.cardTitleWhite}>{model_and_origin}</h4>
              <p className={classes.cardCategoryWhite}>
                {displayedModel === model ? displayedModelTitle : ''}
              </p>
            </CardHeader>
            <CardBody>
              {
                (expiredModel && (expiredModel === model)) ?
                  <p>No model loaded</p>
                  :
                  (showErrors) ?
                    <ul className={classes.errorList}>
                      {errors.map((e) => (<li className={classes.errorListItem} key={e.key}>{e.message}</li>))}
                    </ul>
                  :
                    (sbmlModelToken === model ?
                      <TreeView
                        data={sbmlModelTreeView}
                      />
                    :
                    [])
              }
            </CardBody>
            <CardFooter stats>
            {
              !modelWasUploaded ?
                <a href={identifiers_org_uri} style={{wordWrap: 'break-word'}}>
                  {identifiers_org_uri}
                </a>
              :
                <div/>
            }
            </CardFooter>
          </Card>
          {sbmlModelToken !== model ?
            (
              (!expiredModel || (expiredModel != model)) ?
              <div style={{textAlign:'center'}}>
                <CircularProgress className={classes.progress} />
              </div> : <div/>
            ) :
            <div>
            <div><br/></div>
            <CardSimulation
              model={model}
              addSliders={addSliders}
              timeStart={timeStart}
              timeStop={timeStop}
              numTimepoints={numTimepoints}
              isStochastic={isStochastic}
              numReplicates={numReplicates}
              enableMeanTrace={enableMeanTrace}
              setSimulationOptions={setSimulationOptions}
              simulateModel={simulateModel}
            />
            <div><br/></div>
            {showValidator ?
              (validatedModel && (model === displayedModel && validatedModel === displayedModel)) ?
              <Card>
                <CardHeader color={modelIsValid ? 'success' : 'danger'}>
                  <h4 className={classes.cardTitleWhite}>{modelIsValid ? 'Valid' : 'Invalid'}</h4>
                </CardHeader>
                <CardBody>
                  <ul className={classes.errorList}>
                    {modelConsistencyErrors.map((e) => (<li className={classes.errorListItem} key={e.key}>{e.message}</li>))}
                  </ul>
                  <div style={{textAlign:'center'}}>
                    <Button color="primary" onClick={() => resetValidation()}>Reset</Button>
                  </div>
                </CardBody>
              </Card> :
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Validation</h4>
                </CardHeader>
                <CardBody style={{textAlign:'center'}}>
                  { (!validatingModel || (validatingModel !== displayedModel) )?
                    <div>
                      <Table className={classes.table}>
                        <TableBody>
                        {
                          validationOpts.map(opt => (
                            <TableRow key={opt.option} className={classes.tableRow}>
                              <TableCell className={classes.tableCell}>
                                <Checkbox
                                  checked={opt.enabled}
                                  onClick={() => this.toggleValidationOpt(opt.option)}
                                  checkedIcon={<Check className={classes.checkedIcon} />}
                                  icon={<Check className={classes.uncheckedIcon} />}
                                  classes={{
                                    checked: classes.checked,
                                    root: classes.root,
                                  }}
                                />
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {opt.label}
                              </TableCell>
                            </TableRow>
                          ))
                        }
                        </TableBody>
                      </Table>
                      <Button color="primary" onClick={() => validateModel(model, enableGeneralChecks, enableIdentifierChecks, enableUnitsChecks, enableMathmlChecks, enableSboChecks, enableOverdeterminedChecks, enableModelingPracticeChecks)}>Validate Now</Button>
                    </div>
                  :
                    <CircularProgress className={classes.progress} />
                  }
                </CardBody>
              </Card>
            :
              <div/>
            }
            </div>
          }
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ModelView);
