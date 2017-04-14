<template>
  <section class="section">

    <h1 class="title">Login</h1>

    <form @submit.prevent="attemptLogin">
      <b-field label="Username">
        <b-input
          :value="username"
          maxlength="30"
          icon="person">
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          :value="password"
          icon="lock">
        </b-input>
      </b-field>

      <b-field>
        <p class="control">
          <button type="submit" class="button is-primary">
            Login
          </button>
        </p>
      </b-field>
    </form>

  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    ...mapActions([
      'attemptLogin'
    ]),
  },
};
</script>

<style>

</style>
