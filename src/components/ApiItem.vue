<template>
    <tr>
        <td>{{ name }}</td>
        <td>
          <span class="icon is-unselectable" :class="{ 'is-success': isActive, 'is-danger': !isActive }" @click="toggleApiActive({ name, isActive })">
            <i class="mdi">{{ isActive ? 'done' : 'clear' }}</i>
          </span>
        </td>
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
      isActive: !!this.active,
    };
  },

  methods: {
    toggleApiActive() {
      if (window.confirm('Are you sure?')) {
        this.$store.dispatch('toggleApiActive', this).then(() => {
          this.isActive = !this.isActive;
        });
      }
    }
  },
};
</script>

<style scoped>
</style>
