import client, { setAccessToken } from '@/api';

export default {
  fetchApis(context) {
    return client.get('apis')
      .then((response) => {
        response.data.map(api => context.commit('STORE_API', api));
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },

  fetchApi(context, name) {
    return client.get(`apis/${name}`)
      .then((response) => {
        context.commit('SET_WORKING_API', response.data);
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },

  toggleApiActive(context, { name, isActive }) {
    return client.put(`apis/${name}`, { active: !isActive })
      .then(() => {
        context.commit('SET_API_ACTIVE', { name, active: !isActive });
      })
      .catch((e) => {
        context.commit('SET_ERROR', `Error: ${e}`);
      });
  },

  // Deprecated for now
  attemptLogin(context, { username, password }) {
    return client.post('login', { username, password })
      .then((response) => {
        setAccessToken(response.data.token);
        context.commit('STORE_TOKEN', response.data.token);
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },
};
