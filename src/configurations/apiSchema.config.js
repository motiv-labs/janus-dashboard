const schema = {
    name: '',
    active: false,
    proxy: {
        preserve_host: false,
        listen_path: '',
        upstream_url: '',
        strip_path: false,
        append_path: false,
        methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
        hosts: ['hellofresh.*'],
    },
    health_check: {
        url: '',
        timeout: 3,
    },
    plugins: [
        {
            name: 'cors',
            label: 'CORS',
            enabled: false,
            config: {
                domains: ['*'],
                methods: ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
                request_headers: ['Origin', 'Authorization', 'Content-Type'],
                exposed_headers: ['X-Debug-Token', 'X-Debug-Token-Link'],
            },
        },
        {
            name: 'rate_limit',
            label: 'Rate Limit',
            enabled: false,
            config: {
                limit: {
                    value: 0,
                    unit: '',
                    units: ['S', 'M', 'H'],
                    labels: ['Seconds', 'Minutes', 'Hours'],
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
            label: 'oAuth',
            enabled: false,
            config: {
                server_name: '',
                server_names: [],
            },
        },
        {
            name: 'compression',
            label: 'Compression',
            enabled: false,
        },
        {
            name: 'request_transformer',
            label: 'Request Transformer',
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
