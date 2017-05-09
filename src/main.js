import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import { sync } from 'vuex-router-sync';
import App from './App';
import store from './store';
import router from './router';
// import registerMiddleware from './middleware';

Vue.config.productionTip = false;
Vue.use(Buefy);

sync(store, router);
// registerMiddleware(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
