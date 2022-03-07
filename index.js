const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDb = require("./app/mongodb");
connectDb()
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Error..." + err);
		process.exit();
	});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require("./app/routes.js")(app);
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
