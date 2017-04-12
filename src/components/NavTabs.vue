<template>
  <nav class="tabs is-boxed">
    <ul>

      <li :class="{ 'is-active': route === 'ApiList' }">
        <router-link class="nav-item" :to="{ name: 'ApiList' }">
          Api List
        </router-link>
      </li>

      <li :class="{ 'is-active': route === '404' }">
        <router-link class="nav-item" to="/asdsa">
          Test
        </router-link>
      </li>

    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      route: null,
    };
  },

  beforeMount() {
    this.route = this.$route.name;
  },

  watch: {
    // eslint-disable-next-line
    '$route'(to) {
      this.route = to.name;
    }
  }
};
</script>
