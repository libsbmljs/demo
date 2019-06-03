import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// core components
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from 'components/CustomButtons/Button.jsx'
import Checkbox from "@material-ui/core/Checkbox"
import Check from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TextField from "@material-ui/core/TextField"

import SimResults from 'components/Simulation/SimResults.jsx'

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
};

class SimControls extends React.PureComponent {
  constructor(props) {
    super(props)
    this.setSimulationOpt = this.setSimulationOpt.bind(this)
    this.renderCheck = this.renderCheck.bind(this)
    this.renderNumeric = this.renderNumeric.bind(this)
  }

  setSimulationOpt(opt, value) {
    const {addSliders, timeStart, timeStop, numTimepoints,
      isStochastic, numReplicates, enableMeanTrace,
      setSimulationOptions
    } = this.props

    const options = {
      add_sliders: addSliders,
      time_start: timeStart,
      time_stop: timeStop,
      num_timepoints: numTimepoints,
      is_stochastic: isStochastic,
      num_replicates: numReplicates,
      enable_mean_trace: enableMeanTrace,
    }
    options[opt] = value
    setSimulationOptions(options.add_sliders, options.time_start, options.time_stop, options.num_timepoints, options.is_stochastic, options.num_replicates, options.enable_mean_trace)
  }

  renderCheck(classes, opt, label, checked, enabled=true) {
    const extraProps = (enabled ? {classes: {
      checked: classes.checked,
      root: classes.root,
    }} : {disabled: true})
    return (
      <TableRow key={opt} className={classes.tableRow}>
        <TableCell className={classes.tableCell} style={{width: '25px'}} >
          <Checkbox
            checked={checked}
            onClick={() => this.setSimulationOpt(opt, !checked)}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            {...extraProps}
          />
        </TableCell>
        <TableCell className={classes.tableCell}>
          {label}
        </TableCell>
      </TableRow>
    )
  }

  renderNumeric(classes, opt, label, content, enabled=true, error=false) {
    const extraProps = error ? {error} : {}
    return (
      <TableRow key={opt} className={classes.tableRow}>
        <TableCell className={classes.tableCell} colSpan={2}>
        <TextField
          label={label}
          disabled={!enabled}
          type="number"
          className={classes.textField}
          value={content}
          onChange={(e) => this.setSimulationOpt(opt, e.target.value)}
          margin="normal"
          {...extraProps}
        />
        </TableCell>
      </TableRow>
    )
  }

  render() {
    const { classes, model, addSliders, timeStart, timeStop, numTimepoints, isStochastic, numReplicates, enableMeanTrace, simulateModel, parameterValues, stochasticInc } = this.props
    const time_start_error = (timeStart < 0)
    const time_stop_error = (timeStop <= timeStart)
    const num_timepoints_error = (numTimepoints < 2)
    const replicates_error = (numReplicates < 0 && isStochastic)
    const can_simulate = (!time_start_error && !time_stop_error && !num_timepoints_error && !replicates_error)
    return (
      <div>
        <Button
          color="primary"
          disabled={!can_simulate}
          onClick={() => simulateModel(model, addSliders, Number(timeStart), Number(timeStop), Number(numTimepoints), isStochastic, Number(numReplicates), enableMeanTrace, parameterValues, Number(stochasticInc))}>Simulate</Button>
        <Table className={classes.table}>
          <TableBody>
            {this.renderNumeric(classes, 'time_start', 'Start time', timeStart, true, time_start_error)}
            {this.renderNumeric(classes, 'time_stop', 'End time', timeStop, true, time_stop_error)}
            {this.renderNumeric(classes, 'num_timepoints', 'Number of timepoints', numTimepoints, true, num_timepoints_error)}
            {this.renderCheck(classes, 'is_stochastic', 'Stochastic', isStochastic)}
            {this.renderNumeric(classes, 'num_replicates', 'Number of replicates', numReplicates, isStochastic, replicates_error)}
            {this.renderCheck(classes, 'enable_mean_trace', 'Show the replicate mean', enableMeanTrace, isStochastic)}
          </TableBody>
        </Table>
      </div>
    )
  }
}

// {this.renderCheck(classes, 'add_sliders', 'Add sliders for parameters (Max. 10)', addSliders)}

export default withStyles(styles)(SimControls);
