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
};
