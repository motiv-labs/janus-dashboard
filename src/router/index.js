import Vue from 'vue';
import Router from 'vue-router';
import ApiList from '@/pages/ApiList';
import NotFound from '@/pages/NotFound';

import authRoutes from './auth';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'ApiList',
    component: ApiList,
  },
].concat(
  authRoutes
).concat([
  // 404 catch all route
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]);

export default new Router({
  mode: 'history',
  routes
});
