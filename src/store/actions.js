import client from '@/api';

export default {
  fetchApis(context) {
    client.get('/apis')
      .then((response) => {
        context.commit('STORE_APIS', response.data);
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },

  attemptLogin(context, username, password) {
    client.post('/login', { username, password })
      .then((response) => {
        context.commit('STORE_TOKEN', response.data.token);
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },
};
