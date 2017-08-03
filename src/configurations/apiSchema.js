const schema = {
    name: '',
    active: false,
    proxy: {
        preserve_host: false,
        listen_path: '',
        upstream_url: '',
        strip_path: false,
        append_path: false,
        methods: ['ALL'],
        hosts: ['hellofresh.*'],
    },
    health_check: {
        url: '',
        timeout: 3,
    },
    plugins: [
        {
            name: 'cors',
            enabled: true,
            config: {
                domains: ['*'],
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                request_headers: ['Origin', 'Authorization', 'Content-Type'],
                exposed_headers: ['X-Debug-Token', 'X-Debug-Token-Link'],
            },
        },
        {
            name: 'rate_limit',
            enabled: true,
            config: {
                limit: '10-S',
                policy: 'local',
            },
        },
        {
            name: 'oauth2',
            enabled: true,
            config: {
                server_name: 'local',
            },
        },
        {
            name: 'compression',
            enabled: true,
        },
        {
            name: 'request_transformer',
            enabled: true,
            config: {
                add: {
                    headers: {
                        TEST: 'TEST',
                    },
                    querystring: 'test',
                },
            },
        },
    ],
};

export default schema;
