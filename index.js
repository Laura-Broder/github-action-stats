const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send("Hello World");
});
app.post("/refresh-data", function (req, res) {
	res.send("refresh-data");
});

app.listen(5000);
