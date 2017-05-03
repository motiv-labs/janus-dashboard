<template>
  <section class="section">

    <h1 class="title">Login</h1>

    <form @submit.prevent="attemptLogin({ username, password })">
      <b-field label="Username">
        <b-input
          v-model="username"
          maxlength="30"
          icon="person">
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          v-model="password"
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
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    attemptLogin(credentials) {
      const redirectTo = this.$route.query.redirect ? this.$route.query.redirect : '/';

      this.$store.dispatch('attemptLogin', credentials).then(() => this.$router.push(redirectTo));
    },
  },
};
</script>

<style>

</style>
