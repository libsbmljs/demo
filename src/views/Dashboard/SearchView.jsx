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
  }
};

function SearchView(props) {
  const { classes, enabled, searchResults } = props;
  const className = !enabled ? classes.disabled : ''
  // const className = ''
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={className}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Search Results</h4>
          </CardHeader>
          <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Model", "Name", "Database", "Curated?"]}
                tableData={searchResults || []}
              />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
//   <Hidden smDown implementation="css">
// </Hidden>
// <Hidden mdUp implementation="css">
//   <Table
//     tableHeaderColor="primary"
//     tableData={(searchResults || []).map(x => [x[1]])}
//   />
// </Hidden>

export default withStyles(styles)(SearchView);
