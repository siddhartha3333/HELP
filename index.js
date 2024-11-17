const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(process.env.MONGO_URI, { dbName: "helpapp" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.post("/api/validate-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).send({ valid: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ valid: true, user: decoded });
  } catch {
    res.status(401).send({ valid: false });
  }
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    socket.emit("message", "Server reply: " + msg);
  });
  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(5000, () => console.log("Server running on port 5000"));
