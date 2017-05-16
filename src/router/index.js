import Vue from 'vue';
import Router from 'vue-router';
import ApiList from '@/pages/ApiList';
import EditApi from '@/pages/EditApi';
import NotFound from '@/pages/NotFound';

import authRoutes from './auth';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'ApiList',
    component: ApiList,
    meta: { requiresAuth: true },
  },
  {
    path: '/:api',
    name: 'EditApi',
    component: EditApi,
    meta: { requiresAuth: true },
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
