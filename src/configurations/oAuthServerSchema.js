const oAuthServerSchema = {
    name: 'live oauth server',
    oauth_endpoints: {
        authorize: {
            preserve_host: false,
            listen_path: '/auth/authorize',
            upstream_url: 'http://localhost:8000/authorize',
            insecure_skip_verify: false,
            strip_path: false,
            append_path: false,
            enable_load_balancing: false,
            methods: ['ALL'],
            hosts: null
        },
        token: {
            preserve_host: false,
            listen_path: '/auth/token',
            upstream_url: 'http://localhost:8000/token',
            insecure_skip_verify: false,
            strip_path: false,
            append_path: false,
            enable_load_balancing: false,
            methods: ['GET', 'POST'],
            hosts: null
        },
        introspect: {
            preserve_host: false,
            listen_path: '/auth/info',
            upstream_url: 'http://localhost:8000/info',
            insecure_skip_verify: false,
            strip_path: false,
            append_path: false,
            enable_load_balancing: false,
            methods: ['GET'],
            hosts: null
        },
        revoke: {
            preserve_host: false,
            listen_path: '/auth/revoke',
            upstream_url: 'http://localhost:8000/revoke',
            insecure_skip_verify: false,
            strip_path: false,
            append_path: false,
            enable_load_balancing: false,
            methods: ['GET','POST'],
            hosts: null
        }
    },
    oauth_client_endpoints: {
        create: {
            preserve_host: false,
            listen_path: '/auth/clients/create',
            upstream_url: 'http://localhost:8000/clients/create',
            insecure_skip_verify: false,
            strip_path: false,
            append_path: false,
            methods: ['POST'],
            hosts: null
        },
        remove: {
            preserve_host: false,
            listen_path: '/auth/clients/remove',
            upstream_url: 'http://localhost:8000/clients/remove',
            insecure_skip_verify: false,
            strip_path: false,
            append_path: false,
            methods: ['DELETE'],
            hosts: null
        }
    },
    cors_meta: {
        domains: ['*'],
        methods: ['GET','POST','PUT','PATCH','DELETE'],
        request_headers: ['Origin','Authorization','Content-Type'],
        exposed_headers: ['X-Debug-Token','X-Debug-Token-Link'],
        enabled: true
    },
    rate_limit: {
        limit: '200-S',
        enabled: false
    },
    token_strategy: {
        name: ['jwt', 'introspection'],
        // next when JWT is selected
        settings: [
            {
                alg: 'HS256',
                key: ''
            },
            {
                alg: 'RS256',
                key: ''
            },
            // for INTROSPECTION
        ],
        // next when INTROSPECTION is selected
        // settings: {
        //     use_aouth_header: boolen,
        //     auth_header_type: string,//no validation
        // },
    },
};

export default oAuthServerSchema;
