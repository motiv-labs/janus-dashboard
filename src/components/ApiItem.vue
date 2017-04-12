<template>
    <tr>
        <td>{{ name }}</td>
        <td v-if="active == true"><code>Yes</code></td>
        <td v-else><code>No</code></td>
        <td>{{ proxy.listen_path }}</td>
        <td>{{ proxy.upstream_url }}</td>
    </tr>
</template>

<script>
export default {
  props: [
    'name',
    'active',
    'proxy',
  ],

  data() {
    return {
    };
  },

  components: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
