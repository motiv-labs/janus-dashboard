const schema = {
    name: '',
    active: false,
    proxy: {
        preserve_host: false,
        listen_path: '',
        upstream_url: '',
        strip_path: false,
        append_path: false,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        hosts: ['hellofresh.*'],
    },
    health_check: {
        url: '',
        timeout: 3,
    },
    plugins: [
        {
            name: 'cors',
            enabled: false,
            config: {
                domains: ['*'],
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                request_headers: ['Origin', 'Authorization', 'Content-Type'],
                exposed_headers: ['X-Debug-Token', 'X-Debug-Token-Link'],
            },
        },
        {
            name: 'rate_limit',
            enabled: false,
            config: {
                limit: {
                    value: 0,
                    unit: '',
                    units: ['S', 'M', 'H'],
                },
                policy: {
                    selected: '',
                    options: [
                        {
                            label: 'local',
                            value: 'local',
                        },
                        {
                            label: 'distributed',
                            value: 'redis',
                        },
                    ],
                },
            },
        },
        {
            name: 'oauth2',
            enabled: false,
            config: {
                server_name: 'local',
            },
        },
        {
            name: 'compression',
            enabled: false,
        },
        {
            name: 'request_transformer',

            enabled: false,
            config: {
                add: {
                    headers: [],
                    querystring: [],
                },
                append: {
                    headers: [],
                    querystring: [],
                },
                replace: {
                    headers: [],
                    querystring: [],
                },
                remove: {
                    headers: []   ,
                    querystring: [],
                },
            },
        },
    ],
};

export default schema;
