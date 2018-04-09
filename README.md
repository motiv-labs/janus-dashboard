# janus-dashboard

> Dashbord for [Janus](https://github.com/hellofresh/janus) project

## Table of contents
1. [About Project](#about-project)
2. [Features](#features)
   1. [Endpoint Management](#endpoint-management)
   2. [Endpoint Creation](#endpoint-creation)
   3. [OAuth Server Management](#oauth-server-management)
   4. [Healthcheck](#healthcheck)
3. [Build Setup](#build-setup)
4. [Configuration](#configuration)

## About Project
**Janus Dashboard** is a more user-friendly way to interact with [Janus](https://github.com/hellofresh/janus) API Gateway. It gives the possibility to work with user interface instead of making HTTP calls with *Postman* or `curl`.

## Features
### Endpoint Management
You can see the list of API endpoints:
![image](https://user-images.githubusercontent.com/8372070/38306951-72e19c80-3812-11e8-8942-ec00bbcb9450.png)

And manage them directly through the UI:
![image](https://user-images.githubusercontent.com/8372070/38307134-0318631a-3813-11e8-8072-4ccae24f2cfb.png)

Endpoint configuration can also be downloaded as `JSON`:
![image](https://user-images.githubusercontent.com/8372070/38307075-d41b0932-3812-11e8-85fa-316383c821ef.png)

### Endpoint Creation
You can create a new API endpoint:
![image](https://user-images.githubusercontent.com/8372070/38307415-fa214622-3813-11e8-8e19-4f8108712368.png)

Or clone it from an existing one:
![image](https://user-images.githubusercontent.com/8372070/38307354-c535ed82-3813-11e8-94b8-32511ecafac5.png)

### OAuth Server Management
You are also able to see the list of OAuth servers:
![image](https://user-images.githubusercontent.com/8372070/38307469-26a53492-3814-11e8-9ef7-25f02b15f91a.png)

And manage them directly through the UI:
![image](https://user-images.githubusercontent.com/8372070/38307516-41120e5e-3814-11e8-806c-6a87d06da53e.png)

### Healthcheck
If there is any problem with the endpoints, you will see a notification in the endpoint list page:
![image](https://user-images.githubusercontent.com/8372070/38307294-85f5c3d6-3813-11e8-9024-633f0ddfd07f.png)

A detailed list of the endpoint issues are also available:
![image](https://user-images.githubusercontent.com/8372070/38307196-42320bc8-3813-11e8-91d9-e5fa7247ffca.png)

[⬆ back to top](#table-of-contents)

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

[⬆ back to top](#table-of-contents)

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

[⬆ back to top](#table-of-contents)
