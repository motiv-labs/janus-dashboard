const register = (store, router) => {
  router.beforeEach((to, from, next) => {
    if (to.auth && !store.state.auth.token) {
      return next('/login');
    }

    return next();
  });
};

export default register;
