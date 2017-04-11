<template>
  <div class="app">
    <nav-bar></nav-bar>

    <div class="wrapper">
      <sidebar class="sidebar"></sidebar>

      <main class="content">
        <ui-alert type="success">
          Here's an alert
        </ui-alert>

        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default {
  name: 'app',
  components: {
    NavBar,
    Sidebar,
  },
};
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: 'Roboto';
  }

  html {
    font-size: 100%;
  }

  body,
  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }

  .sidebar {
    order: -1;
  }

  @media (min-width: 768px) {
    .wrapper {
      flex-direction: row;
      flex: 1;
    }

    .content {
      flex: 1;
      margin: 0 2rem;
    }

    .sidebar {
      flex: 0 0 12em;
    }
  }
</style>
