import { getToken } from '@/api';

const register = (store, router) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!getToken()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

export default register;
