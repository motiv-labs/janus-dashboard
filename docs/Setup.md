# Setup

> Before go any further you definitely should have Janus. If you don't have it yet, you can follow this [guide](https://github.com/hellofresh/janus/tree/master/docs/quick_start).

## Step 1
Have Janus :wink:

## Step 2
Login to Janus

## Step 3
### Set up environment variables

Create a `docker-compose.yml` file:

```yaml
  janus-dashboard:
      image: quay.io/hellofresh/janus-dashboard
      environment: 
        REACT_APP_JANUS_URI: http://<your-janus-admin-api>:8081
        REACT_APP_CLIENT_ID: ""
        REACT_APP_SCOPE: "read:org"
        REACT_APP_JANUS_TOKEN_URL: 'http://<your-janus-admin-api>:8081'
        REACT_APP_GITHUB_TOKEN_URL: 'http://<your-janus-public-api>:8080/auth/github/token'
        REACT_APP_GITHUB_AUTHORIZE_URL: 'http://<your-janus-public-api>:8080/auth/github/authorize'
      ports:
          - "8083:80"
```

Then execute:
```
docker-compose up -d
```

## Step 4
### Create Github App

Go to 'settings':

<image src="https://user-images.githubusercontent.com/8372070/39759169-3d3dcd30-52d2-11e8-81ee-5c9ebe1d89ba.png" width="350" />

Go to 'Developer settings':

<image src="https://user-images.githubusercontent.com/8372070/39749218-6496af34-52b2-11e8-846c-379ed46c4ccc.png" width="350" />

Then go to 'OAuth Apps' and click 'New OAuth App' button in top right corner:

<image src="https://user-images.githubusercontent.com/8372070/39749321-ab1f9b0a-52b2-11e8-85a6-9e8e812411e3.png" width="350" />

There you should fill the form:

<image src="https://user-images.githubusercontent.com/8372070/39749459-01a4b910-52b3-11e8-9932-e2de66b6c3fa.png" width="350" />

For example like this:

<image src="https://user-images.githubusercontent.com/8372070/39749524-2fda3fe4-52b3-11e8-8145-3a56299c35ec.png" width="350" />

After that you will see your app in the 'OAuth Apps':

<image src="https://user-images.githubusercontent.com/8372070/39749769-cbdeb7d0-52b3-11e8-8892-51722e46ce54.png" width="350" />

When you will click on your app you will see next:

<image src="https://user-images.githubusercontent.com/8372070/39759376-d091b7d6-52d2-11e8-89c5-04c26829b5e2.png" width="350" />


## Step 5
### Create a new OAuth2 Server

Now, when you have `Client ID` and `Client Secret` create a new OAuth2 Server:

```
curl -d '{
    "name": "github-auth",
    "oauth_endpoints": {
        "authorize": {
            "listen_path": "/auth/github/authorize",
            "upstreams": {
                "balancing": "roundrobin",
                "targets": [
                    {
                        "target": "https://github.com/login/oauth/authorize",
                        "weight": 0
                    }
                ]
            },
            "methods": [
                "ALL"
            ]
        },
        "token": {
            "listen_path": "/auth/github/token",
            "upstreams": {
                "balancing": "roundrobin",
                "targets": [
                    {
                        "target": "https://github.com/login/oauth/access_token",
                        "weight": 0
                    }
                ]
            },
            "methods": [
                "GET",
                "POST"
            ]
        },
        "introspect": {
            "listen_path": "/auth/github/introspect",
            "upstreams": {
                "balancing": "roundrobin",
                "targets": [
                    {
                        "target": "https://api.github.com/user",
                        "weight": 0
                    }
                ]
            },
            "methods": [
                "GET"
            ]
        }
    },
    "secrets": {
        "<your-client-id>": "<your-client-secret>"
    },
    "cors_meta": {
        "domains": [
            "*"
        ],
        "methods": [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],
        "request_headers": [
            "Origin",
            "Authorization",
            "Content-Type"
        ],
        "exposed_headers": [
            "X-Debug-Token",
            "X-Debug-Token-Link"
        ],
        "enabled": true
    },
    "token_strategy": {
        "name": "introspection",
        "settings": {
            "auth_header_type": "token",
            "use_auth_header": true
        },
        "leeway": 0
    }
}' -X POST <your-janus-admin-api>/oauth/servers
```


## Step 6
### Update environment variables

Add your `Client ID` to environment variables:

```yaml
  janus-dashboard:
      image: quay.io/hellofresh/janus-dashboard
      environment: 
        REACT_APP_JANUS_URI: http://<your-janus-admin-api>:8081
        REACT_APP_CLIENT_ID: <your-client-id>
        REACT_APP_SCOPE: "read:org"
        REACT_APP_JANUS_TOKEN_URL: 'http://<your-janus-admin-api>:8081'
        REACT_APP_GITHUB_TOKEN_URL: 'http://<your-janus-public-api>:8080/auth/github/token'
        REACT_APP_GITHUB_AUTHORIZE_URL: 'http://<your-janus-public-api>:8080/auth/github/authorize'
      ports:
          - "8083:80"
```

and run again:
```
docker-compose up -d
```

[back to "Table of contents"](../README.md#Table-of-contents)