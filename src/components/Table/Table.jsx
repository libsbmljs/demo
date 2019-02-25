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
import Hidden from "@material-ui/core/Hidden"
import { range } from 'lodash'

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, setActiveModel } = props
  return (
       <AutoSizer>
         {({ height, width }) => (
           <React.Fragment>
           <Hidden smDown implementation="css">
             <Table
                className={classes.table}
                headerHeight={30}
                rowHeight={45}
                rowClassName={({index}) => (index !== -1 ? classes.tableRow : '')}
                rowCount={tableData.length || 0}
                rowGetter={({index}) => (tableData[index] || {})}
                onRowClick={({rowData}) => {setActiveModel(rowData.id)}}
                height={height}
                width={width}
              >
                <Column
                  key='id'
                  label='id'
                  dataKey='id'
                  headerClassName={classes[tableHeaderColor + "TableHeader"]}
                  width={150}
                  cellRenderer={({cellData,rowData}) => <a href={`/#/view?m=${rowData.id}`}>{cellData}</a>}
                />
                <Column
                  key='title'
                  label='title'
                  dataKey='title'
                  headerClassName={classes[tableHeaderColor + "TableHeader"]}
                  width={400}
                  flexGrow={1}
                  flexShrink={0}
                  cellRenderer={({cellData,rowData}) => <a href={`/#/view?m=${rowData.id}`}>{cellData}</a>}
                />
                <Column
                  key='origin'
                  label='origin'
                  dataKey='origin'
                  headerClassName={classes[tableHeaderColor + "TableHeader"]}
                  width={100}
                  cellRenderer={({cellData,rowData}) => <a href={`/#/view?m=${rowData.id}`}>{cellData}</a>}
                />
                <Column
                  key='curated'
                  label='curated'
                  dataKey='curated'
                  headerClassName={classes[tableHeaderColor + "TableHeader"]}
                  width={100}
                  cellRenderer={({cellData,rowData}) => <a href={`/#/view?m=${rowData.id}`}>{cellData}</a>}
                />
              </Table>
            </Hidden>
            <Hidden mdUp implementation="css">
              <Table
                 className={classes.table}
                 headerHeight={30}
                 disableHeader={true}
                 rowHeight={45}
                 rowClassName={({index}) => (index !== -1 ? classes.tableRow : '')}
                 rowCount={tableData.length || 0}
                 rowGetter={({index}) => (tableData[index] || {})}
                 height={height}
                 width={width}
               >
                 <Column
                   key='title'
                   label='title'
                   dataKey='title'
                   headerClassName={classes[tableHeaderColor + "TableHeader"]}
                   width={400}
                   flexGrow={1}
                   flexShrink={0}
                   cellRenderer={({cellData,rowData}) => <a href={`/#/view?m=${rowData.id}`}>{cellData}</a>}
                 />
              </Table>
            </Hidden>
            </React.Fragment>
          )}
        </AutoSizer>)
}

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
