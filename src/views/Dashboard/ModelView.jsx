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
import Hidden from "@material-ui/core/Hidden"

import "assets/css/material-dashboard-react.css"

import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

const styles = {
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
  }
};

function ModelView(props) {
  const { classes, model, displayedModel, displayedModelOrigin, displayedModelOriginStr, displayedModeNumReactions, displayedModeNumSpecies, displayedModeNumCompartments, displayedModeNumEvents, displayedModeNumFunctions, displayedModeNumRules } = props
  const identifiers_org_uri = displayedModel === model ?
    (displayedModelOrigin === 'BioModels' ? 'http://identifiers.org/biomodels.db/' : 'http://identifiers.org/bigg.model/')+displayedModel
     : ''
  return (
    <GridContainer style={{minHeight:'calc(100vh - 240px)'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card style={{minHeight:'calc(100vh - 240px)'}}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{model}</h4>
            <p className={classes.cardCategoryWhite}>
              {displayedModel === model ? displayedModelOrigin : ''}
            </p>
          </CardHeader>
          <CardBody>
          <h4>The identifiers.org URI for this model</h4>
          <a href={identifiers_org_uri}>
          {identifiers_org_uri}
           </a>
           <p>
           {displayedModeNumReactions>0 ? `${displayedModeNumReactions} reactions, ${displayedModeNumSpecies} species, ${displayedModeNumCompartments} compartments, ${displayedModeNumEvents} events, ${displayedModeNumFunctions} functions, ${displayedModeNumRules} rules` : ''}
           </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(ModelView);
