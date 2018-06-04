const oAuthServerSchema = {
  name: '',
  oauth_endpoints: {
    authorize: {
      preserve_host: false,
      listen_path: '',
      upstream_url: '',
      upstreams: {
        balancing: '',
        targets: [],
        options: [
          {
            balancing: 'roundrobin',
            targets: [
              {
                target: ''
              }
            ]
          },
          {
            balancing: 'weight',
            targets: [
              {
                target: '',
                weight: 0
              }
            ]
          }
        ]
      },
      insecure_skip_verify: false,
      strip_path: false,
      append_path: false,
      enable_load_balancing: false,
      methods: [],
      all_methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
      hosts: []
    },
    token: {
      preserve_host: false,
      listen_path: '',
      upstream_url: '',
      upstreams: {
        balancing: '',
        targets: [],
        options: [
          {
            balancing: 'roundrobin',
            targets: [
              {
                target: ''
              }
            ]
          },
          {
            balancing: 'weight',
            targets: [
              {
                target: '',
                weight: 0
              }
            ]
          }
        ]
      },
      insecure_skip_verify: false,
      strip_path: false,
      append_path: false,
      enable_load_balancing: false,
      methods: [],
      all_methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
      hosts: []
    },
    introspect: {
      preserve_host: false,
      listen_path: '',
      upstream_url: '',
      upstreams: {
        balancing: '',
        targets: [],
        options: [
          {
            balancing: 'roundrobin',
            targets: [
              {
                target: ''
              }
            ]
          },
          {
            balancing: 'weight',
            targets: [
              {
                target: '',
                weight: 0
              }
            ]
          }
        ]
      },
      insecure_skip_verify: false,
      strip_path: false,
      append_path: false,
      enable_load_balancing: false,
      methods: [],
      all_methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
      hosts: []
    },
    revoke: {
      preserve_host: false,
      listen_path: '',
      upstream_url: '',
      upstreams: {
        balancing: '',
        targets: [],
        options: [
          {
            balancing: 'roundrobin',
            targets: [
              {
                target: ''
              }
            ]
          },
          {
            balancing: 'weight',
            targets: [
              {
                target: '',
                weight: 0
              }
            ]
          }
        ]
      },
      insecure_skip_verify: false,
      strip_path: false,
      append_path: false,
      enable_load_balancing: false,
      methods: [],
      all_methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
      hosts: []
    }
  },
  oauth_client_endpoints: {
    create: {
      all_methods: ['POST'],
      preserve_host: false,
      listen_path: '',
      upstream_url: '',
      upstreams: {
        balancing: '',
        targets: [],
        options: [
          {
            balancing: 'roundrobin',
            targets: [
              {
                target: ''
              }
            ]
          },
          {
            balancing: 'weight',
            targets: [
              {
                target: '',
                weight: 0
              }
            ]
          }
        ]
      },
      insecure_skip_verify: false,
      strip_path: false,
      append_path: false,
      methods: [],
      hosts: []
    },
    remove: {
      all_methods: ['DELETE'],
      preserve_host: false,
      listen_path: '',
      upstream_url: '',
      upstreams: {
        balancing: '',
        targets: [],
        options: [
          {
            balancing: 'roundrobin',
            targets: [
              {
                target: ''
              }
            ]
          },
          {
            balancing: 'weight',
            targets: [
              {
                target: '',
                weight: 0
              }
            ]
          }
        ]
      },
      insecure_skip_verify: false,
      strip_path: false,
      append_path: false,
      methods: [],
      hosts: []
    }
  },
  cors_meta: {
    domains: ['*'],
    methods: [],
    all_methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
    request_headers: ['Origin', 'Authorization', 'Content-Type'],
    exposed_headers: ['X-Debug-Token', 'X-Debug-Token-Link'],
    enabled: true
  },
  rate_limit: {
    limit: {
      value: 0,
      unit: '',
      units: ['S', 'M', 'H'],
      labels: ['Seconds', 'Minutes', 'Hours']
    },
    enabled: false
  },
  token_strategy: {
    name: '',
    settings: [],
    strategies: [
      {
        name: 'jwt',
        settings: [
          {
            alg: '',
            key: ''
          }
        ]
      },
      {
        name: 'introspection',
        settings: {
          use_auth_header: false,
          auth_header_type: ''
        }
      }
    ]
  }
}

export default oAuthServerSchema
