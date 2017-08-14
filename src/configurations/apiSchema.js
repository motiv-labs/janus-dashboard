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
                // limit: '10-S',
                limit: {
                    value: 0,
                    // units: ['ns', 'us', 'ms', 's', 'm', 'h'],
                    units: ['S', 'M', 'H'],
                },
                policy: [
                    {
                        label: 'local',
                        value: 'local',
                    },
                    {
                        label: 'destributed',
                        value: 'redis',
                    }
                ],
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
                    headers: [
                        {
                            key: 'One',
                            value: 'add_val',
                        },
                        {
                            key: 'Two',
                            value: 'add_blabla',
                        },
                        {
                            key: 'trhee',
                            value: 'add_blabla',
                        }
                    ],
                    querystring: {
                        test: 'test',
                    },
                },
                append: {
                    headers: [
                        {
                            key: 'One',
                            value: 'append_1',
                        },
                        {
                            key: 'Two',
                            value: 'append_ssdsd',
                        }
                    ],
                    querystring: {
                        test: 'test',
                    },
                },
                replace: {
                    headers: [
                        {
                            key: 'One',
                            value: 'replacaecde',
                        },
                    ],
                    querystring: {
                        test: 'test',
                    },
                },
                remove: {
                    headers: [
                        {
                            key: 'One',
                            value: 'sasasa',
                        },
                    ],
                    querystring: {
                        test: 'test',
                    },
                },
            },
        },
    ],
};

export default schema;
