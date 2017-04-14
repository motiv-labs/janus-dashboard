<template>
  <nav class="nav has-shadow">
    <div class="nav-left">
      <router-link class="nav-item" :to="{ name: 'ApiList' }">
        <img class="janus-logo" src="../assets/janus-logo-vertical.svg">
      </router-link>
    </div>

    <div class="nav-center">
      <a href="https://github.com/hellofresh/janus" target="_blank" class="nav-item">
        <b-icon icon="code"></b-icon>
      </a>
    </div>

    <div class="nav-right">
    </div>
  </nav>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>
