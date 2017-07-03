<template>
  <section class="section">
    <h1 class="title">Edit</h1>
    <h2 class="subtitle">{{ workingApi.name }}</h2>

    <form @submit.prevent="saveApi">

      <b-field grouped>
        <b-field label="Listen Path">
          <b-input v-model="workingApi.proxy.listen_path"></b-input>
        </b-field>

        <b-field label="Upstream URL">
          <b-input v-model="workingApi.proxy.upstream_url"></b-input>
        </b-field>
      </b-field>

      <edit-plugin v-for="plugin of workingApi.plugins" key="plugin.name" :plugin="plugin"></edit-plugin>

      <div class="has-text-centered">
        <button class="button is-large is-primary">Save</button>
      </div>

    </form>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import EditPlugin from '@/components/EditPlugin';

export default {
  components: {
    EditPlugin
  },

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

  methods: {
    saveApi() {
      this.$dialog.confirm({
        message: 'Are you sure?',
        onConfirm: () => {
          console.log(this.workingApi);
        }
      });
    },
  },
};
</script>

<style scoped>
  .code-area > textarea {
    font-family: monospace;
  }
</style>
