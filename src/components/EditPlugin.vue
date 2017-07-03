<template>

  <b-field grouped>
    <b-field label="Plugin">
      <b-input :value="plugin.name" disabled></b-input>
    </b-field>

    <b-field label="Enabled">
      <b-switch v-model="plugin.enabled" on-off></b-switch>
    </b-field>

    <b-field label="Config" expanded class="config-header">

      <b-field v-for="config, key of plugin.config" key="key" :label="key" class="plugin-config">
        <b-input v-model="config"></b-input>
      </b-field>

    </b-field>
  </b-field>
</template>

<script>
export default {
  props: [
    'plugin',
  ]
};
</script>

<style scoped>
.config-header {
  display: block;
}

.config-header > .field {
  margin-left: 0.75rem;
}

.config-header .field .input {
  font-family: monospace;
}
</style>
