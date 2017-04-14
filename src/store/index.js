import Vue from 'vue';
import Vuex from 'vuex';

import realActions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

import mockActions from './mockActions';

const actions = process.env.USE_MOCKS ? mockActions : realActions;

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
});
