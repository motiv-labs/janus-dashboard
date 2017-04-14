export default {
  STORE_APIS(state, apis) {
    state.apis = apis;
  },

  SET_ERROR(state, message = null) {
    state.errorMessage = message;
  },

  STORE_TOKEN(state, token = null) {
    state.token = token;
  }
};
