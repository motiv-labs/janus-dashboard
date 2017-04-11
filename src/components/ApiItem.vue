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
import UiSwitch from 'keen-ui/src/UiSwitch';

export default {
  name: 'ApiItem',
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
    UiSwitch,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
