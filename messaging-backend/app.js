const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const path = require("path");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const mongoose = require("mongoose");
const helmet = require("helmet");
const Messages = require("./model/MessagesContent");
const cors = require("cors");
require("dotenv").config();

const signup = require("./routes/signup");
const login = require("./routes/login");
const validtoken = require("./routes/tokenIsValid");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yfg2i.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

app.disable("x-powered-by"); // hiding express from users
app.use(express.static(path.join(__dirname, "build")));

// app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(signup);
app.use(login);
app.use(validtoken);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


//socket connection

io.on("connection", (socket) => {
  console.log("User connected " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chats", (data) => {
    const messages = new Messages({
      message: data.msg,
      name: data.username,
      timeStamp: data.time,
    });
    messages.save();
    io.emit("chat_rcvd", {
      msg: data.msg,
      user: data.username,
      time: data.time,
      id: socket.id,
    });
  });
});

//Server and mongodb connection
const PORT = process.env.PORT || 5555;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    http.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
