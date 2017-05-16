<template>
  <section class="section" style="overflow-x: scroll;">
    <h1 class="title">APIs</h1>
    <h2 class="subtitle">Some thing stuff other things</h2>

    <table class="table">
      <thead>
        <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Listen Path</th>
            <th>Upstream URL</th>
        </tr>
      </thead>
      <tbody>
        <api-item
          v-for="api in apis"
          :key="api.name"
          :name="api.name"
          :active="api.active"
          :proxy="api.proxy"
          :plugins="api.plugins">
        </api-item>
      </tbody>
    </table>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import ApiItem from '../components/ApiItem';

export default {
  components: {
    ApiItem,
  },

  computed: {
    ...mapState([
      'apis',
    ]),
  },

  beforeMount() {
    this.$store.dispatch('fetchApis');
  }
};
</script>
