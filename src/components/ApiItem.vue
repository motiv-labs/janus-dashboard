<template>
    <tr>
        <td>{{ name }}</td>
        <td>
          <span class="icon is-unselectable" :class="{ 'is-success': isActive, 'is-danger': !isActive }" @click="toggleApiActive">
            <i class="mdi">{{ isActive ? 'done' : 'clear' }}</i>
          </span>
        </td>
        <td>{{ proxy.listen_path }}</td>
        <td>{{ proxy.upstream_url }}</td>
        <td>
          <span class="icon is-unselectable" :class="{ 'is-success': isOauthEnabled, 'is-danger': !isOauthEnabled }">
            <i class="mdi">lock{{ isOauthEnabled ? '_outline' : '_open' }}</i>
          </span>
        </td>
    </tr>
</template>

<script>
export default {
  props: [
    'name',
    'active',
    'proxy',
    'plugins',
  ],

  data() {
    return {
      isActive: !!this.active,
      isProtected: undefined,
    };
  },

  computed: {
    isOauthEnabled() {
      if (typeof this.isProtected !== 'undefined') {
        return this.isProtected;
      }

      const oauth = this.plugins.find(plugin => plugin.name.indexOf('oauth2') > -1);
      return !!oauth && !!oauth.enabled;
    }
  },

  methods: {
    toggleApiActive() {
      this.$dialog.confirm({
        message: 'Are you sure?',
        onConfirm: () => {
          this.$store.dispatch('toggleApiActive', this).then(() => {
            this.isActive = !this.isActive;
          });
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
