<script lang="ts">
export default {
  name: 'CoachReviewsListLoading',
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
  min-height: inherit;
  align-items: center;
  justify-content: center;
}
</style>
