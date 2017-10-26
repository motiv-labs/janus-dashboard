export default {
    MAIN: {
        path: '/',
        name: 'API Definitions',
    },
    HEALTHCHECK: {
        path: '/healthcheck',
        name: 'Health Check',
    },
    OAUTH_SERVERS: {
        path: '/oauth/servers',
        name: 'OAuth Servers',
    },
    OAUTH_SERVER: {
        path: '/oauth/servers/:name',
        name: '',
    },
    NEW_OAUTH_SERVER: {
        path: '/oauth/servers/new',
        name: '',
    },
    NEW: {
        path: '/new',
        name: 'New API',
    },
    LOGIN: {
        path: '/login',
        name: 'Login Page',
    },
    GITHUB_AUTH: {
        path: '/auth/github/callback',
        name: '',
    },
    EDIT: {
        path: '/:name',
        name: '',
    },
};
