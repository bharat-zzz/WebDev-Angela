const express = require("express");
const bodyParser = require("body-parser");
const { getDate } = require("./date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let items = ["First", "Second", "Third"];
let workItems = [];

app.get("/", function (req, res) {
    let day = getDate();
    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
