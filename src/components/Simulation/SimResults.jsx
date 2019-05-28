import React from "react"
import PropTypes from "prop-types"
import Plot from 'react-plotly.js';
// import classNames from 'classnames'
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles"

function SimResults({ ...props }) {
  const { simulationResults } = props
  if (simulationResults !== null)
    console.log('simulationResults', simulationResults.data)
  return ( simulationResults !== null ?
    <Plot
     data={simulationResults.data}
     layout={ {width: 800, height: 600, title: 'Simulation Results'} }
   /> : <div/>)
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
