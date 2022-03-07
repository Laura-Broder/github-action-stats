const axios = require("axios");

const GITHUB_API = "https://api.github.com";

exports.getOrgRepos = async (org_name) => {
	const repos = await axios.get(`${GITHUB_API}/orgs/${org_name}/repos`);
	return repos.data;
};
exports.getWorkflowsByOrgAndRepo = async (org_name, repo) => {
	const workflows = await axios.get(`${GITHUB_API}/repos/${org_name}/${repo}/actions/workflows`);
	return workflows.data;
};
exports.getRunsByOrgRepoAndWorkflowId = async (org_name, repo, workflowId) => {
	const runs = await axios.get(`${GITHUB_API}/repos/${org_name}/${repo}/actions/workflows/${workflowId}/runs`);
	return runs.data;
};
