import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    cursor: "pointer"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableCell2: {
    cursor: "pointer",
  },
  tableRow: {
    borderStyle: "none none solid none",
    borderWidth: "1px",
    borderSpacing: "0",
    borderCollapse: "collapse",
    borderColor: "#eeeeee",
    // holy shet https://github.com/facebook/react/issues/7635
    '&:hover': {
      backgroundColor: "#eeeeee"
    },
    cursor: "pointer"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
});

export default tableStyle;
