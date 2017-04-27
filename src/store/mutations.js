import Vue from 'vue';

export default {
  STORE_API(state, api) {
    state.apis = { ...state.apis, [api.name]: api };
  },

  SET_API_ACTIVE(state, { name, active }) {
    Vue.set(state.apis[name], 'active', active);
  },

  SET_ERROR(state, message = null) {
    state.errorMessage = message;
  },

  STORE_TOKEN(state, token = null) {
    state.token = token;
  }
};
