const axios = require("axios");

const GITHUB_API = "https://api.github.com";

exports.getOrgRepos = (org_name) => {
	return axios.get(`${GITHUB_API}/orgs/${org_name}/repos`);
};
exports.getArtifactsByOrgAndRepo = async (org_name, repo) => {
	const artifacts = await axios.get(`${GITHUB_API}/repos/${org_name}/${repo}/actions/artifacts`);
	return artifacts.data;
};


const mongoose = require("mongoose");
const MONGODB_URL = "mongodb+srv://github-org-user:github-org-user@cluster.tvtsp.mongodb.net/action_stats_db?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
	.connect(MONGODB_URL, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Error...", err);
		process.exit();
	});
