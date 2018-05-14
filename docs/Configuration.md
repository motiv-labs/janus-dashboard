# Configuration

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

[back to "Table of contents"](../README.md#Table-of-contents)
