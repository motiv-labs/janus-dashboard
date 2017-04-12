<template>
  <div class="app">
    <nav-bar></nav-bar>

    <div class="columns">
      <main class="column">
        <hero></hero>

        <b-notification type="is-danger" has-icon v-if="errorMessage" @close="SET_ERROR">
          {{ errorMessage }}
        </b-notification>

        <router-view class="container"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Hero from './components/Hero';
import NavBar from './components/NavBar';

export default {
  components: {
    Hero,
    NavBar,
  },

  computed: mapState([
    'errorMessage',
  ]),

  methods: {
    ...mapMutations([
      'SET_ERROR'
    ]),
  }
};
</script>

<style>

</style>
