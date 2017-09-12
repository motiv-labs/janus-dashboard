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

In order to set up your application you need to create `.env` file in the root:

```javascript
/**
 * .env
 */
REACT_APP_BASE_URL='http://your-url.com'
REACT_APP_CLIENT_ID='your-client-id'
REACT_APP_SCOPE='read:org'
REACT_APP_EXCHANGE_CODE_ON_TOKEN_URL='https://your-url.com/auth/github/token'
REACT_APP_ACCESS_TOKEN_URL='http://again-your-url.com'
REACT_APP_AUTHORIZE_URL='https://your-url.com/auth/github/authorize'
```
