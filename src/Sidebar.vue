<template>
  <div>
    <ui-button v-for="item in fakeList" type="secondary">
      {{ item }}
    </ui-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  computed: {
    fakeList() {
      const list = [];
      for (let i = 0; i < 22; i++) {
        list.push('Testings');
      }

      return list;
    }
  },
};
</script>
