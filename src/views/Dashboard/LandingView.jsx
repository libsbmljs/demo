import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// core components
import GridItem from "components/Grid/GridItem.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import Table from "components/Table/Table.jsx"
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import Hidden from "@material-ui/core/Hidden"

import "assets/css/material-dashboard-react.css"

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
  disabled: {
    opacity: "0.75"
  },
  landingPad: {
    borderRadius: '25px',
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: 'rgb(120,120,120)',
  },
  demoText: {
    margin: '2em',
    fontSize: '18pt',
  },
  demoListItem: {
    marginBottom:'1em',
  },
};

class LandingView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  uploadFile() {
    if ('files' in this.fileUpload) {
      if (this.fileUpload.files.length != 0) {
        for (const f of this.fileUpload.files) {
          // const f = this.fileUpload.files[i]
          const reader = new FileReader()
          reader.onload = ((f) => (
            (e) => console.log(e.target.result)
          ))(f)
          reader.readAsText(f)
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer style={{minHeight:'calc(100vh - 240px)'}}>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.landingPad} style={{minHeight:'calc(100vh - 240px)'}} onClick={() => this.fileUpload.click()}>
            <p className={classes.demoText}>
              How to use:
            </p>
            <ol className={classes.demoText}>
              <li className={classes.demoListItem} >Search for BioModels and BiGG Models using the bar.</li>
              <li className={classes.demoListItem} >Click here or drag and drop to upload an SBML model.</li>
            </ol>
            <input id='fileuploadcontrol' type='file' hidden onChange={(f) => this.uploadFile()} ref={input => this.fileUpload = input}/>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(LandingView);
