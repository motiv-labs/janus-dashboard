const schema = {
  name: '',
  active: false,
  proxy: {
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
    strip_path: false,
    append_path: false,
    methods: ['ALL', 'CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
    hosts: []
  },
  health_check: {
    url: '',
    timeout: 3
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
        exposed_headers: ['X-Debug-Token', 'X-Debug-Token-Link']
      }
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
          labels: ['Seconds', 'Minutes', 'Hours']
        },
        policy: {
          selected: '',
          options: [
            {
              label: 'local',
              value: 'local'
            },
            {
              label: 'distributed',
              value: 'redis'
            }
          ]
        }
      }
    },
    {
      name: 'oauth2',
      label: 'OAuth',
      enabled: false,
      config: {
        server_name: '',
        server_names: []
      }
    },
    {
      name: 'compression',
      label: 'Compression',
      enabled: false
    },
    {
      name: 'request_transformer',
      label: 'Request Transformer',
      enabled: false,
      config: {
        add: {
          headers: [],
          querystring: []
        },
        append: {
          headers: [],
          querystring: []
        },
        replace: {
          headers: [],
          querystring: []
        },
        remove: {
          headers: [],
          querystring: []
        }
      }
    },
    {
      name: 'retry',
      label: 'Retry',
      enabled: false,
      config: {
        attempts: 0,
        backoff: '1s',
        predicate: 'statusCode == 0 || statusCode >= 500'
      }
    }
  ]
}

export default schema
