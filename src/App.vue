<script lang="ts">
import TheHeader from './components/layouts/TheHeader.vue';
import TheMain from './components/layouts/TheMain.vue';

export default {
  name: 'App',
  components: { TheHeader, TheMain },
};
</script>

<template>
  <TheHeader />
  <TheMain />
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  width: 100%;
  margin: 0 auto;
  min-height: 2000px;
  text-align: center;
}
</style>
