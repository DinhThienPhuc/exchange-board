import cors from "cors";
import express, { static as expressStatic } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import {
  modifyChange,
  modifyChangePercent,
  modifyPriceAndVolume,
  modifyStatus,
  modifyValue,
} from "./src/helpers/functions.js";
import { originalData } from "./src/helpers/originalData.js";

const app = express();

const port = process.env.PORT || 4869;

app.use(cors());
app.use(expressStatic("build"));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

var previousData = [];

io.on("connection", (socket) => {
  console.log("User connected");
  if (!previousData.length) {
    const newData = originalData.map((row) => {
      return {
        ...row,
        latestPrice: row.originalPrice,
        latestVolume: row.originalVolume,
        value: parseInt(row.originalPrice * row.originalVolume),
      };
    });
    previousData = [...newData];
    io.sockets.emit("change data", previousData);
  } else {
    io.sockets.emit("change data", previousData);
  }

  const refreshIntervalId = setInterval(() => {
    const newData = previousData.map((row) => {
      const modifiedPriceAndVolume = modifyPriceAndVolume(row);
      const modifiedValue = modifyValue(modifiedPriceAndVolume);
      const modifiedChange = modifyChange(modifiedValue);
      const modifiedChangePercent = modifyChangePercent(modifiedChange);
      const modifiedStatus = modifyStatus(modifiedChangePercent);
      return modifiedStatus;
    });
    previousData = [...newData];
    io.sockets.emit("change data", previousData);
  }, 5000);

  socket.on("disconnect", () => {
    clearInterval(refreshIntervalId);
    socket.disconnect();
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
