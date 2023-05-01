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

</style>
