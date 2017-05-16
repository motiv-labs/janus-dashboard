<template>
  <section class="section">
    <h1 class="title">Edit</h1>
    <h2 class="subtitle">Things</h2>

    <form @submit.prevent="">

      <b-field label="Name">
        <b-input :value="workingApi.name"></b-input>
      </b-field>

      <b-field grouped>
        <b-field label="Listen Path">
          <b-input :value="workingApi.proxy.listen_path"></b-input>
        </b-field>

        <b-field label="Upstream URL">
          <b-input :value="workingApi.proxy.upstream_url"></b-input>
        </b-field>
      </b-field>

      <b-field grouped v-for="plugin of workingApi.plugins" key="plugin.name">
        <b-field label="Plugin">
          <b-input :value="plugin.name"></b-input>
        </b-field>

        <b-field label="Enabled">
          <b-switch v-model="plugin.enabled" on-off></b-switch>
        </b-field>

        <b-field label="Config" expanded>
            <b-input type="textarea" class="code-area" :value="JSON.stringify(plugin.config, null, 2)"></b-input>
        </b-field>
      </b-field>

      <div class="has-text-centered">
        <button class="button is-large is-primary">Save</button>
      </div>

    </form>

  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'workingApi',
      'schema'
    ]),
  },

  beforeMount() {
    if (this.$route.params.api !== 'new') {
      this.$store.dispatch('fetchApi', this.$route.params.api);
    }
  },
};
</script>

<style>
  .code-area > textarea {
    font-family: monospace;
  }
</style>
