<script lang="ts">
export default {
  name: 'CoachRateLoading',
};
</script>

<template>
  <div class="loading">
    <svg-spinners-ring-resize />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  place-items: center;
}
</style>
