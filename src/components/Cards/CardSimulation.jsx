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

import SimResults from 'components/SimResults/SimResults.jsx'

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

class CardSimulation extends React.PureComponent {
  constructor(props) {
    super(props)
    // this.toggleValidationOpt = this.toggleValidationOpt.bind(this)
  }

  render() {
    const { classes } = this.props
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Simulation</h4>
        </CardHeader>
        <CardBody>
          <SimResults/>
        </CardBody>
      </Card>
    )
  }
}

export default withStyles(styles)(CardSimulation);
