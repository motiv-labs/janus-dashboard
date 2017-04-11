<template>
  <section class="page page--ui-tabs">
    <h2 class="page__title">APIs</h2>

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
                      <api-item v-for="item in items" :name="item.name" :active="item.active" :proxy="item.proxy"></api-item>
                  </tbody>
              </table>
          </div>
      </ui-tab>
    </ui-tabs>
  </section>
</template>

<script>
import axios from 'axios';
import UiTabs from 'keen-ui/src/UiTabs';
import UiTab from 'keen-ui/src/UiTab';
import ApiItem from './ApiItem';

export default {
  name: 'hello',
  data() {
    return {
      items: [],
    };
  },

  components: {
    ApiItem,
    UiTabs,
    UiTab,
  },

  beforeMount() {
    this.loadMessage();
  },

  methods: {
    loadMessage() {
      axios.get('http://localhost:8081/apis')
      .then((response) => {
        console.log(response);
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
