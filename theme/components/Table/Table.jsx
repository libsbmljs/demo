import React from "react"
import PropTypes from "prop-types"
import classNames from 'classnames'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx"
// virtualized
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized'
import { range } from 'lodash'

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  // console.log('tableHead',tableHead)
  // console.log('tableData',tableData)
  // console.log('range(4)',range(4))
            // className={classes.table}
  return  <Table
            headerHeight={10}
            rowHeight={30}
            rowCount={tableData.length || 0}
            rowGetter={({index}) => (tableData[index] || {})}
            height={600}
            width={1000}
          >
            <Column
              key='id'
              dataKey='id'
              width={150}
            />
            <Column
              key='title'
              dataKey='title'
              width={400}
            />
            <Column
              key='origin'
              dataKey='origin'
              width={100}
            />
            <Column
              key='curated'
              dataKey='curated'
              width={100}
            />
          </Table>
}
// <div className={classes.tableResponsive}>
// </div>
// cellRenderer={({cellData,dataKey}) =>
//   (<TableCell className={classes.tableCell}>
//     {cellData ? cellData[dataKey] : ''}
//   </TableCell>)
// }
  // <AutoSizer>
  //   {({ height, width }) => (
  // </AutoSizer>

// <Table className={classes.table}>
//   {tableHead !== undefined ? (
//     <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
//       <TableRow>
//         {tableHead.map((prop, key) => {
//           return (
//             <TableCell
//               className={classes.tableCell + " " + classes.tableHeadCell}
//               key={key}
//             >
//               {prop}
//             </TableCell>
//           );
//         })}
//       </TableRow>
//     </TableHead>
//   ) : null}
//   <TableBody>
//     {tableData.map((prop, key) => {
//       return (
//         <TableRow key={key}>
//           {prop.map((prop, key) => {
//             return (
//               <TableCell className={classes.tableCell} key={key}>
//                 {prop}
//               </TableCell>
//             );
//           })}
//         </TableRow>
//       );
//     })}
//   </TableBody>
// </Table>

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(Object)
};

export default withStyles(tableStyle)(CustomTable);
