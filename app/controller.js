const { Repo, Run, Workflow } = require("./model.js");
const { getOrgRepos, getWorkflowsByOrgAndRepo, getRunsByOrgRepoAndWorkflowId } = require("./axiosClient");

// test
exports.test = (req, res) => {
	res.send("Hello World");
};

// refresh data in db
exports.refreshData = async (req, res) => {
	const { org_name } = req.body;
	try {
		// 1. get repos by org name
		const orgReposRes = await getOrgRepos(org_name);
		if (!orgReposRes.length) {
			console.error(`${org_name} organization has no repositories`);
			res.status(404).send("no repos were found for this organization");
		}
		console.log(`got ${orgReposRes.length} repositories for ${org_name}`);
		orgReposRes.forEach(async (repo) => {
			const dbRepo = await Repo.findOne({ id: repo.id });
			if (!dbRepo) {
				console.log(`adding repo ${repo.name} to DB`);
				const newDbRepo = new Repo({
					id: repo.id,
					name: repo.name,
					org_name: repo.owner.login,
					org_id: repo.owner.id
				});
				newDbRepo.save();
			} else {
				console.log(`repo ${repo.name} is already in db`);
			}
			// 2. get workflows by org and repo
			const workflowsByOrgAndRepoRes = await getWorkflowsByOrgAndRepo(org_name, repo.name);
			if (!workflowsByOrgAndRepoRes.workflows.length) {
				console.log(`no workflows were found for repo ${repo.name} in organization ${org_name}`);
				return;
			}
			console.log(`got ${workflowsByOrgAndRepoRes.workflows.length} workflows for repo ${repo.name} in organization ${org_name}`);
			workflowsByOrgAndRepoRes.workflows.forEach(async (workflow) => {
				const dbWorkflow = await Workflow.findOne({ id: workflow.id });
				if (!dbWorkflow) {
					console.log(`adding workflow ${workflow.name} to DB`);
					const newDbWorkflow = new Workflow({
						...workflow,
						org_name: org_name,
						repo_name: repo.name
					});
					newDbWorkflow.save();
				} else {
					console.log(`workflow ${workflow.name} is already in db`);
				}
				// 3. get runs by org, repo and workflow
				const runsByOrgRepoAndWorkflowIdRes = await getRunsByOrgRepoAndWorkflowId(org_name, repo.name, workflow.id);
				if (!runsByOrgRepoAndWorkflowIdRes.workflow_runs.length) {
					console.log(`no runs were found for workflow ${workflow.name} of repo ${repo.name} in organization ${org_name}`);
					return;
				}
				console.log(`got ${runsByOrgRepoAndWorkflowIdRes.workflow_runs.length} workflow runs for workflow ${workflow.name} of repo ${repo.name} in organization ${org_name}`);
				runsByOrgRepoAndWorkflowIdRes.workflow_runs.forEach(async (run) => {
					const dbRun = await Run.findOne({ workflowRunId: run.id });
					if (!dbRun) {
						console.log(`adding run id ${run.id} to DB`);
						const newDbRun = new Run({
							workflowId: workflow.id,
							workflowName: workflow.name,
							workflowPath: workflow.path,
							workflowRunId: run.id,
							status: run.status,
							conclusion: run.conclusion,
							runAt: new Date(run.run_started_at).getTime(),
							repoId: repo.id,
							repoName: repo.name,
							ownerId: repo.owner.id,
							ownerName: repo.owner.login,
							branch: run.head_branch,
							commitSHA: run.head_sha
						});
						await newDbRun.save();
					} else {
						console.log(`run id ${run.id} is already in db`);
					}
				});
			});
		});
		console.log("Data refreshed successfully");
		res.send("Data refreshed successfully");
	} catch (error) {
		res.send("there was a problem getting workflow runs for this organization");
	}
};

// get all workflow runs for workflow_id
exports.getWorkflowRuns = async (req, res) => {
	const { org_name, workflow_id } = req.params;
	try {
		const workflowRuns = await Run.find({ workflowId: workflow_id, ownerName: org_name });
		console.log(`found ${workflowRuns.length} workflowRuns for workflow id ${workflow_id} in org ${org_name}`);
		res.send(workflowRuns);
	} catch (error) {
		console.error("Error in getWorkflowRuns ~ error", error.response);
		res.status(error.response.status).send("Sorry, cant find that. " + error);
	}
};

// get all workflow runs for org
exports.getOrgRuns = async (req, res) => {
	const { org_name } = req.params;
	try {
		const orgRuns = await Run.find({ ownerName: org_name });
		console.log(`found ${orgRuns.length} workflowRuns for org ${org_name}`);
		res.send(orgRuns);
	} catch (error) {
		console.error("Error in getOrgRuns ~ error", error.response);
		res.status(error.response.status).send("Sorry, cant find that. " + error);
	}
};
