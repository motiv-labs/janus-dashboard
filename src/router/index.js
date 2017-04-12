import Vue from 'vue';
import Router from 'vue-router';
import ApiList from '@/components/ApiList';
import NotFound from '@/components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ApiList',
      component: ApiList,
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ],
});
