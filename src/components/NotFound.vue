<template>
  <section>
    <h1>404</h1>

    <p>The page {{ url }} was not found</p>
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
