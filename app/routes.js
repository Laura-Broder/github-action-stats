module.exports = (app) => {
	const App = require("./controller.js");

	app.get("/test", App.test);

	app.post("/refresh-data", App.refreshData);

	app.get("/org/:org_name/daily_runs/:workflow_id", App.getWorkflowRuns);

	app.get("/org/:org_name/daily_runs", App.getOrgRuns);
};
