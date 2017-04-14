import axios from 'axios';

export default {
  fetchApis(context) {
    axios.get('http://localhost:8080/apis')
      .then((response) => {
        context.commit('STORE_APIS', response.data);
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },

  attemptLogin(context, username, password) {
    axios.post('http://localhost:8080/login', { username, password })
      .then((response) => {
        context.commit('STORE_TOKEN', response.data.token);
      })
      .catch(() => {
        context.commit('SET_ERROR', 'Infernal server error');
      });
  },
};
