/* eslint-disable */
const fakeApi = {
  'name' : 'posts',
  'active' : true,
  'proxy' : {
    'preserve_host' : false,
    'listen_path' : '/posts/*',
    'upstream_url' : 'https://jsonplaceholder.typicode.com/posts',
    'strip_path' : true,
    'append_path' : false,
    'enable_load_balancing' : false,
    'methods' : ['ALL'],
    'hosts': ['hellofresh.*']
  },
  'plugins': [
    {
      'name': 'cors',
      'enabled' : true,
      'config': {
        'domains' : [
          '*'
        ],
        'methods' : [
          'GET',
          'POST',
          'PUT',
          'PATCH',
          'DELETE'
        ],
        'request_headers' : [
          'Origin',
          'Authorization',
          'Content-Type'
        ],
        'exposed_headers' : [
          'X-Debug-Token',
          'X-Debug-Token-Link'
        ]
      }
    },
    {
      'name': 'rate_limit',
      'enabled' : true,
      'config': {
          'limit' : '10-S',
          'policy': 'local'
      }
    },
    {
      'name': 'oauth2',
      'enabled' : true,
      'config': {
        'server_name': 'local'
      }
    },
    {
      'name': 'compression',
      'enabled': true
    }
  ]
};

export default {
  fetchApis(context) {
    setTimeout(() => {
      context.commit('STORE_API', fakeApi);
    }, 500);
  },

  attemptLogin(context, username, password) {
    if (username === 'admin' && password === 'admin') {
      context.commit('STORE_TOKEN', 'aaaaa');
    } else {
      context.commit('SET_ERROR', 'Infernal server error');
    }
  },

  toggleApiActive(context, api) {
    context.commit('SET_API_ACTIVE', { name: api.name, active: !api.active });
  }
};
