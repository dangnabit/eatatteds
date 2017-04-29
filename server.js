var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));


app.use(express.static('public'));

var tables = [{
    name: 'E-Dog',
    phoneNumber: '773-488-8888',
    email: 'edawg@yahoo.woof',
    resSize: 4,
    uniqueID: 'e3g58ac',
    waitList: false
}]


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});


app.get("/makeres", function(req, res) {
    res.sendFile(path.join(__dirname, "makeres.html"));
});

app.get("/viewtables", function(req, res) {

    res.sendFile(path.join(__dirname, "viewtables.html"));
});


app.get("/api/:table?", function(req, res) {
    var chosen = req.params.table;

    if (chosen === 'waitlist') {
        return res.json(tables.slice(5));
    } else if (chosen === 'clear') {
        tables = [];
        res.sendFile(path.join(__dirname, "viewtables.html"));
    } else {
        return res.json(tables);
    }
});

app.get("/api/:table?", function(req, res) {
    var chosen = req.params.table;

    if (chosen === 'waitlist') {
        return res.json(waitList);
    } else if (chosen === 'clear') {
        tables = [];
        waitlist = [];
        res.sendFile(path.join(__dirname, "viewtables.html"));
    } else {
        return res.json(tables);
    }
});


app.post("/api/new", function(req, res) {
    var newTable = req.body;

    console.log(newTable);

    if (tables.length < 5) {
        newTable.waitList = false;
        tables.push(newTable);
    } else {
        newTable.waitList = true;
        tables.push(newTable);
    }

    res.json(newTable);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
