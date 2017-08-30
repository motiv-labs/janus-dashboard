# janus-dashboard

> Dashbord for [Janus](https://github.com/hellofresh/janus) project

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
yarn global add serve && serve -s build

# serve with hot reload on port 8082
npm run start
```

## Configuration

In order to set up your URL, you should create `config.js` file and put it in the root:

```javascript
var MAIN_CONFIG =  {
    gateway: {
        uri: 'http://your-url.com',
    },
};
```
