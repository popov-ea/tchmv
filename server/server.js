const express = require("express");
const bodyParser = require("body-parser");
const jsonBodyParser = bodyParser.json();
const urlencBodyParser = bodyParser.urlencoded({extended: false});

const app = express();
app.use(express.static(__dirname + "/files"));

app.use(jsonBodyParser);
app.use(urlencBodyParser);

app.use("/api", jsonBodyParser, urlencBodyParser, require("./controllers"));

app.listen(3001, () => {
    console.log("listening");
});
