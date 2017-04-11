import Vue from 'vue';
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.min.css';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(KeenUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
