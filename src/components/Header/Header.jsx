import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "./HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  const { classes, color, setEnteredQuery, query } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Hidden smDown implementation="css">
            <Button color="transparent" href="#" className={classes.title}>
              {'libsbmljs demo'}
            </Button>
          </Hidden>
        </div>
        <HeaderLinks setEnteredQuery={setEnteredQuery} query={query} />
      </Toolbar>
    </AppBar>
  );
}
// <Hidden smDown implementation="css">
// </Hidden>
// <Hidden mdUp implementation="css">
//   <IconButton
//     color="inherit"
//     aria-label="open drawer"
//     onClick={props.handleDrawerToggle}
//   >
//     <Menu />
//   </IconButton>
// </Hidden>

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
