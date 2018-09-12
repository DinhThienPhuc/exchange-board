import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { compareValuesByProperty } from "../helpers/functions";

const styles = theme => ({
  tabContainer: {
    width: "80%",
    marginLeft: "10%",
    marginTop: 0,
    overflowX: "auto",
    borderRadius: 0,
    boxShadow: "none"
  },
  table: {
    minWidth: 800
  },
  tableCell: {
    color: "#afadad",
    fontWeight: "normal"
  },
  codeCompany: {
    color: "#2296f3",
    width: "10%",
    paddingRight: 0
  },
  company: {
    color: "#989696",
    width: "25%",
    paddingRight: 0
  },
  price: {
    width: "15%"
  },
  value: { width: "22%" },
  normal: { width: "14%" },
  increase: {
    width: "14%",
    color: "#23d160"
  },
  decrease: { width: "14%", color: "#f50057" }
});

const TabContainer = props => {
  const { classes, data = [], order } = props;
  const duplicateData = [...data];
  const sortedData = duplicateData.sort(
    compareValuesByProperty("value", order)
  );
  sortedData.length = 20;

  return (
    <Paper className={classes.tabContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{ tableLayout: "auto" }}>
            <TableCell className={classes.tableCell}>Code</TableCell>
            <TableCell className={classes.tableCell}>Company</TableCell>
            <TableCell className={classes.tableCell} numeric>
              Price
            </TableCell>
            <TableCell className={classes.tableCell} numeric>
              Value
            </TableCell>
            <TableCell className={classes.tableCell} numeric>
              Change
            </TableCell>
            <TableCell className={classes.tableCell} numeric>
              %Change
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map(row => {
            return (
              <TableRow key={row.code}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.codeCompany}
                >
                  {row.code}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.company}
                >
                  {row.company}
                </TableCell>
                <TableCell numeric className={classes.price}>
                  {row.lastestPrice}
                </TableCell>
                <TableCell numeric className={classes.value}>
                  {row.value}
                </TableCell>
                <TableCell
                  numeric
                  className={row.status ? classes[row.status] : classes.normal}
                >
                  {row.change}
                </TableCell>
                <TableCell
                  numeric
                  className={row.status ? classes[row.status] : classes.normal}
                >
                  {row["%change"]}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

TabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  order: PropTypes.string
};

export default withStyles(styles)(TabContainer);
