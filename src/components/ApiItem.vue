<template>
    <tr>
        <td>{{ name }}</td>
        <td>
          <span class="icon is-unselectable" :class="{ 'is-success': isActive, 'is-danger': !isActive }" @click="toggleActive">
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
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
</style>
