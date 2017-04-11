import Vue from 'vue';
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.min.css';
import { sync } from 'vuex-router-sync';
import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(KeenUI);

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
