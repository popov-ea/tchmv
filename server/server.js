const express = require("express");
const bodyParser = require("body-parser").json();

const app = express();
app.use(express.static(__dirname + "/files"));

app.use(bodyParser);

app.use("/api", bodyParser, require("./controllers"));

app.listen(3001, () => {
    console.log("listening");
});
