const mongoose = require("mongoose");

const RepoSchema = mongoose.Schema({
	id: Number,
	name: String,
	org_name: String,
	org_id: Number
});
const WorkflowSchema = mongoose.Schema({
	id: Number,
	org_name: String,
	repo_name: String,
	node_id: String,
	name: String,
	path: String,
	state: String,
	created_at: String,
	updated_at: String,
	url: String,
	html_url: String,
	badge_url: String
});
const RunSchema = mongoose.Schema({
	workflowId: Number,
	workflowName: String,
	workflowPath: String,
	workflowRunId: Number,
	status: String,
	conclusion: String,
	runAt: Number,
	repoId: Number,
	repoName: String,
	ownerId: Number,
	ownerName: String,
	branch: String,
	commitSHA: String
});

exports.Repo = mongoose.model("Repo", RepoSchema);
exports.Workflow = mongoose.model("Workflow", WorkflowSchema);
exports.Run = mongoose.model("Run", RunSchema);
