<template>
  <section>
    <h2>APIs</h2>

    <ui-tabs raised>
      <ui-tab title="Slots">
          <div class="table-responsive">
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
                        :name="api.name"
                        :active="api.active"
                        :proxy="api.proxy">
                      </api-item>
                  </tbody>
              </table>
          </div>
      </ui-tab>
    </ui-tabs>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import ApiItem from './ApiItem';

export default {
  components: {
    ApiItem,
  },

  computed: mapState([
    'apis',
  ]),

  beforeMount() {
    this.$store.dispatch('fetchApis');
  },
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
