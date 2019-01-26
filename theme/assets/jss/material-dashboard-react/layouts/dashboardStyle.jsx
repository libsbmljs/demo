import {
  drawerWidth,
  transition,
  container,
  mainContainer
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: "100%"
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "50px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 240px)"
  },
  container,
  mainContainer,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
