import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  codeCompany: {
    color: "#2296f3"
  },
  increase: {
    color: "#23d160"
  },
  decrease: { color: "#f50057" },
  tableCell: {
    color: "#afadad",
    fontWeight: "normal"
  },
  company: {
    color: "#989696"
  }
});

const TabContainer = props => {
  const { classes, data = [] } = props;
  return (
    <Paper className={classes.tabContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
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
          {data.map(row => {
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
                <TableCell numeric>{row.lastestPrice}</TableCell>
                <TableCell numeric>
                  {parseInt(row.lastestPrice * row.lastestVolume, 10)}
                </TableCell>
                <TableCell numeric className={classes[row.status]}>
                  {row.change}
                </TableCell>
                <TableCell numeric className={classes[row.status]}>
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
  data: PropTypes.array
};

export default withStyles(styles)(TabContainer);
