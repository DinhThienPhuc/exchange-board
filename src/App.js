import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import TabContainer from "./components/TabContainer";

const styles = {
  root: {
    flexGrow: 1,
  },
  tabToolbar: {
    backgroundColor: "#20c1db",
    width: "80%",
    marginLeft: "10%",
    boxShadow: "none",
    position: "relative",
  },
  tabLabel: {
    display: "flex",
    justifyContent: "flex-end",
  },
  tabLabelItem: {
    fontWeight: "normal",
  },
};

const App = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);

  const handleChange = (_, value) => {
    console.log("numeric", value);
    setValue(value);
  };

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4869", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("change data", (data) => {
      setData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={styles.root}>
      <AppBar position="static" style={styles.tabToolbar}>
        <Tabs value={value} onChange={handleChange} style={styles.tabLabel}>
          <Tab label="top gainers" style={styles.tabLabelItem} />
          <Tab label="top losers" style={styles.tabLabelItem} />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer data={data} order="desc" />}
      {value === 1 && <TabContainer data={data} order="asc" />}
    </div>
  );
};

export default App;
