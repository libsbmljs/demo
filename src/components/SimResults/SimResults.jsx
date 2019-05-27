import React from "react"
import PropTypes from "prop-types"
import Plot from 'react-plotly.js';
// import classNames from 'classnames'
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles"

function SimResults({ ...props }) {
  // const { classes, tableHead, tableData, tableHeaderColor, setActiveModel } = props
  return (
    <Plot
     data={[
       {
         x: [1, 2, 3],
         y: [2, 6, 3],
         type: 'scatter',
         mode: 'lines+points',
         marker: {color: 'red'},
       },
       {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
     ]}
     layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
   />)
}

// SimResults.defaultProps = {
//   tableHeaderColor: "gray"
// };
//
// SimResults.propTypes = {
//   classes: PropTypes.object.isRequired,
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray"
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(Object)
// };

// export default withStyles(tableStyle)(SimResults);
export default SimResults;
