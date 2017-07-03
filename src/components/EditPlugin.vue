<template>

  <b-field grouped>
    <b-field label="Plugin">
      <b-input :value="plugin.name" disabled></b-input>
    </b-field>

    <b-field label="Enabled">
      <b-switch v-model="plugin.enabled" on-off></b-switch>
    </b-field>

    <b-field label="Config" expanded>

      <b-field v-for="config, key of plugin.config" key="key" :label="key" class="plugin-config">
        <b-input v-model="config"></b-input>
      </b-field>

    </b-field>
  </b-field>
</template>

<script>

</script>

<style>

</style>
