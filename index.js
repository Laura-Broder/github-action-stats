const express = require("express");
const { getOrgRepos, getArtifactsByOrgAndRepo } = require("./axiosClient");

const PORT = 5000;
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// router
app.get("/org/:org_name/daily_runs/:workflow_id", async (req, res) => {
	const { org_name, workflow_id } = req.params;
	try {
	} catch (error) {
		console.error("file: index.js ~ line 14 ~ app.get ~ error", error.response);
		res.status(error.response.status).send("Sorry, cant find that. " + error);
	}
});

app.post("/refresh-data", async (req, res) => {
	const { org_name } = req.body;
	console.log("file: index.js ~ line 36 ~ app.post ~ org_name", org_name);
	try {
		const orgReposRes = await getOrgRepos(org_name);
		if (!orgReposRes.data.length) {
			res.status(404).send("no repos were found for this organization");
		}
		const promiseArray = orgReposRes.data.map((repo) => {
			return getArtifactsByOrgAndRepo(org_name, repo.name);
		});
		const orgArtifacts = await Promise.all(promiseArray);
		res.send(orgArtifacts);
	} catch (error) {
		res.status(error.response.status).send("there was a problem getting workflow runs for this organization");
	}
});

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
