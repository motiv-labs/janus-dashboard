# janus-dashboard

> Dashbord for [Janus](https://github.com/hellofresh/janus) project

## Table of contents
1. [About Project](#about-project)
1. [Build Setup](#build-setup)
1. [Configuration](#configuration)

## About Project
**Janus-dashboard** is more user friendly way to work with [Janus](https://github.com/hellofresh/janus) API Gateway. It gives possibility to work with user interface instead of making calls with *Postman* or `curl`.
What it gives:

You can see the list of API endpoints:
![image](https://user-images.githubusercontent.com/8372070/38306951-72e19c80-3812-11e8-8942-ec00bbcb9450.png)

and manage them just there:

- edit:
![image](https://user-images.githubusercontent.com/8372070/38307134-0318631a-3813-11e8-8072-4ccae24f2cfb.png)

- copy as JSON or download as a `json` file:
![image](https://user-images.githubusercontent.com/8372070/38307075-d41b0932-3812-11e8-85fa-316383c821ef.png)

If you have some problems with endpoints you will see a notification about that on the endpoints list page:
![image](https://user-images.githubusercontent.com/8372070/38307294-85f5c3d6-3813-11e8-9024-633f0ddfd07f.png)

and on the saparate page:
![image](https://user-images.githubusercontent.com/8372070/38307196-42320bc8-3813-11e8-91d9-e5fa7247ffca.png)

You can create brand new API endpoint:
![image](https://user-images.githubusercontent.com/8372070/38307415-fa214622-3813-11e8-8e19-4f8108712368.png)

or clone it from an existing one:
![image](https://user-images.githubusercontent.com/8372070/38307354-c535ed82-3813-11e8-94b8-32511ecafac5.png)

Also you are able to see the list of OAuth servers:
![image](https://user-images.githubusercontent.com/8372070/38307469-26a53492-3814-11e8-9ef7-25f02b15f91a.png)

and manage them directly throught the UI:
![image](https://user-images.githubusercontent.com/8372070/38307516-41120e5e-3814-11e8-806c-6a87d06da53e.png)

## Build Setup

```bash
# install dependencies and build project using dockerized version of node (requires docker installed)
make all-docker

# serve built project using dockerized version of node (requires docker installed)
# serves on docker internal port 5000, see host port with "docker ps" after start
make serve-docker

# serve with hot reload using dockerized version of node (requires docker installed)
# serves on docker internal port 8082, see host port with "docker ps" after start
make run-docker

# install dependencies and build project using local version of node
make
# or
npm install && npm run build

# serve built project on port 5000
npm install -g serve && serve -s build

# serve with hot reload on port 8082
npm run start
```

## Configuration

In order to set up your application you should create `config.js` file with all your configs and put it in the root:

```javascript
var MAIN_CONFIG =  {
    gateway: {
        uri: 'http://your-url.com',
        client_id: 'your-client-id',
        scope: 'read:org',
        github_token_url: 'http://your-url.com/auth/github/token',
        janus_token_url: 'http://your-url.com',
        github_authorize_url: 'http://your-url.com/auth/github/authorize',
    },
};
```
