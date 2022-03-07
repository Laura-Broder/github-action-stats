const mongoose = require("mongoose");
// const MONGODB_URL = "mongodb://localhost:27017/action_stats_db";
const MONGODB_URL = "mongodb://mongo:27017/action_stats_db";

const connectDb = () => {
	return mongoose.connect(MONGODB_URL, {
		useNewUrlParser: true
	});
};
module.exports = connectDb;
