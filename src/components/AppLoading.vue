<script lang="ts">
export default {
  name: 'AppLoading',
};
</script>

<template>
  <div class="app-loading">
    <svg-spinners:bars-scale-middle width="5em" height="5em" />
  </div>
</template>

<style lang="scss" scoped>
.app-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
