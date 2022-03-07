# GitHub actions statistics REST API

## Description

-   This is a multi-container docker application it consists of an Nodejs/Express web server that exposes a REST API.

-   it provides information regarding a GitHub Organization’s Actions statistics. the data collected by the server is held in a DB.

-   For the users’ convenience, the web server and all of its dependencies is packaged within a Docker environment.

## Pre-requirements:

Please install `docker` and `docker-compose` to run this app locally.

## Installation

1. Clone or download the repo to your local machine:

```bash
$ git clone https://github.com/Laura-Broder/github-action-stats.git
```

2. Build and run the project:

```bash
$ docker-compose build // Build the project
$ docker-compose -d up // Run the app
```

3. shut down the app:

```bash
$ docker-compose down --volume
```

# API

## Refresh the data

To make sure the data of the workflow runs you request is up-to-date you need to send a POST request with the name of the organization in the body of the request:

```javascript
POST localhost:5000/refresh-data
body: { org_name: <org-name> }
```

## Get all the workflow runs of the organization

If you want all the runs of all the workflows in an organization, pass the organization name in the params of the request:

```javascript
GET localhost:5000/org/<org-name>/daily-runs
```

## Get all the workflow runs of a specific workflow in the organization

If you want all the runs of a specific workflow in the organization, pass the organization name and workflow id in the params of the request:

```javascript
GET localhost:5000/org/<org-name>/daily-runs/<workflow-id>
```
