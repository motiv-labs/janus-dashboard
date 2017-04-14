<template>
  <section class="section">
    <h1 class="title">404</h1>
    <h2 class="subtitle">The page {{ url }} was not found...</h2>
  </section>
</template>

<script>
export default {
  data() {
    return {
      url: null,
    };
  },

  created() {
    this.url = this.$route.fullPath;
  }
};
</script>
