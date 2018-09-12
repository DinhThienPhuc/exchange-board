import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import TabContainer from "./components/TabContainer";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tabToolbar: {
    backgroundColor: "#20c1db",
    width: "80%",
    marginLeft: "10%",
    boxShadow: "none",
    position: "relative"
  },
  tabLabel: {
    display: "flex",
    justifyContent: "flex-end"
  },
  tabLabelItem: {
    fontWeight: "normal"
  },
  brand: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "1em",
    color: "#fff",
    fontWeight: "500"
  }
});

class App extends Component {
  state = {
    value: 0,
    endpoint: "http://localhost:4869"
  };

  _handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, data } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.tabToolbar}>
          <Typography className={classes.brand}>S&P/CND</Typography>
          <Tabs
            value={value}
            onChange={this._handleChange}
            className={classes.tabLabel}
          >
            <Tab label="top gainers" className={classes.tabLabelItem} />
            <Tab label="top losers" className={classes.tabLabelItem} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer data={data} order="desc" />}
        {value === 1 && <TabContainer data={data} order="asc" />}
      </div>
    );
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("change data", data => {
      this.setState({ data });
    });
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
