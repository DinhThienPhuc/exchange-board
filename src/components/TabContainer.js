import React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { compareValuesByProperty } from "../helpers/functions";

const styles = {
  tabContainer: {
    width: "80%",
    marginLeft: "10%",
    marginTop: 0,
    overflowX: "auto",
    borderRadius: 0,
    boxShadow: "none",
  },
  table: {
    minWidth: 800,
  },
  tableCell: {
    color: "#afadad",
    fontWeight: "normal",
  },
  codeCompany: {
    color: "#2296f3",
    width: "10%",
    paddingRight: 0,
  },
  company: {
    color: "#989696",
    width: "25%",
    paddingRight: 0,
  },
  price: {
    width: "15%",
  },
  value: { width: "22%" },
  normal: { width: "14%" },
  increase: {
    width: "14%",
    color: "#23d160",
  },
  decrease: { width: "14%", color: "#f50057" },
};

// eslint-disable-next-line react/prop-types
const TabContainer = ({ data = [], order }) => {
  const duplicateData = [...data];
  const sortedData = duplicateData.sort(
    compareValuesByProperty("value", order),
  );
  sortedData.length = 20;

  return (
    <Paper style={styles.tabContainer}>
      <Table style={styles.table}>
        <TableHead>
          <TableRow style={{ tableLayout: "auto" }}>
            <TableCell style={styles.tableCell}>Code</TableCell>
            <TableCell style={styles.tableCell}>Company</TableCell>
            <TableCell style={styles.tableCell} numeric>
              Price
            </TableCell>
            <TableCell style={styles.tableCell} numeric>
              Value
            </TableCell>
            <TableCell style={styles.tableCell} numeric>
              Change
            </TableCell>
            <TableCell style={styles.tableCell} numeric>
              %Change
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => {
            return (
              <TableRow key={row.code}>
                <TableCell
                  component="th"
                  scope="row"
                  style={styles.codeCompany}
                >
                  {row.code}
                </TableCell>
                <TableCell component="th" scope="row" style={styles.company}>
                  {row.company}
                </TableCell>
                <TableCell numeric style={styles.price}>
                  {row.latestPrice}
                </TableCell>
                <TableCell numeric style={styles.value}>
                  {row.value}
                </TableCell>
                <TableCell
                  numeric
                  style={row.status ? styles[row.status] : styles.normal}
                >
                  {row.change}
                </TableCell>
                <TableCell
                  numeric
                  style={row.status ? styles[row.status] : styles.normal}
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

export default TabContainer;
