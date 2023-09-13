<script lang="ts">
export default {
  name: 'CoachListLoading',
};
</script>

<template>
  <div class="loading">
    <svg-spinners-ring-resize />
  </div>
</template>

<style lang="scss" scoped>
.loading {
  padding: 1em;
  display: flex;
  flex-direction: column;
  place-items: center;
}
</style>
