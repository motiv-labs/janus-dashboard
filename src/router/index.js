import Vue from 'vue';
import Router from 'vue-router';
import ApiList from '@/components/ApiList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ApiList',
      component: ApiList,
    },
  ],
});
