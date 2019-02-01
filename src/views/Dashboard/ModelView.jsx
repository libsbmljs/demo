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
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from 'components/CustomButtons/Button.jsx'

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
  },
  progress: {
    color: primaryColor,
    margin: '1 em',
  },
  cardWithMargin: {
    margin: '10 em',
  },
};

function ModelView(props) {
  const { classes, model, displayedModel, displayedModelTitle, displayedModelOrigin, displayedModelOriginStr,
    sbmlModelToken, sbmlModelNumReactions, sbmlModelNumSpecies, sbmlModelNumCompartments,
    sbmlModelNumEvents, sbmlModelNumFunctions, sbmlModelNumRules,
    validateModel, validatingModel, validatedModel, modelIsValid, modelConsistencyErrors,
   } = props
  const identifiers_org_uri = displayedModel === model ?
    (displayedModelOrigin === 'BioModels' ? 'http://identifiers.org/biomodels.db/' : 'http://identifiers.org/bigg.model/')+displayedModel
     : ''
  return (
    <GridContainer style={{minHeight:'calc(100vh - 240px)'}}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{model}</h4>
            <p className={classes.cardCategoryWhite}>
              {displayedModel === model ? displayedModelOrigin : ''}
            </p>
          </CardHeader>
          <CardBody>
            <h4>{displayedModel === model ? displayedModelTitle : ''}</h4>
            <a href={identifiers_org_uri}>
              {identifiers_org_uri}
            </a>
            {sbmlModelToken === model ?
            <p>
            {`${sbmlModelNumReactions} reactions, ${sbmlModelNumSpecies} species, ${sbmlModelNumCompartments} compartments, ${sbmlModelNumEvents} events, ${sbmlModelNumFunctions} functions, ${sbmlModelNumRules} rules`}
            </p> : []}
          </CardBody>
        </Card>
        {sbmlModelToken !== model ?
          <div style={{textAlign:'center'}}>
            <CircularProgress className={classes.progress} />
          </div> :
          <div>
          <div><br/></div>
          {validatedModel === displayedModel ?
          <Card>
            <CardHeader color={modelIsValid ? 'success' : 'danger'}>
              <h4 className={classes.cardTitleWhite}>{modelIsValid ? 'Valid' : 'Invalid'}</h4>
            </CardHeader>
            <CardBody>
              {modelConsistencyErrors.map((e) => (<div key={e.key}>{e.message}</div>))}
            </CardBody>
          </Card> :
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Validation</h4>
            </CardHeader>
            <CardBody style={{textAlign:'center'}}>
              { validatingModel !== displayedModel ?
              <div>
                <Button color="primary" onClick={() => validateModel(model)}>Validate Now</Button>
              </div> :
              <CircularProgress className={classes.progress} />
              }
            </CardBody>
          </Card>}
          </div>
        }
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(ModelView);
