const express = require("express");
const bodyParser = require("body-parser");
const jsonBodyParser = bodyParser.json();
const urlencBodyParser = bodyParser.urlencoded({ extended: false });
const { createServer } = require("http");
const io = require("socket.io");

const app = express();
app.use(express.static(__dirname + "/files"));

app.use(jsonBodyParser);
app.use(urlencBodyParser);

app.use("/api", jsonBodyParser, urlencBodyParser, require("./controllers"));


const server = createServer(app);

const socketIoInstance = io(server);

socketIoInstance.on("connection", (socket) => {
    console.log(socket.id + " connected");
});

server.listen(3001, () => {
    console.log("listening");
});
