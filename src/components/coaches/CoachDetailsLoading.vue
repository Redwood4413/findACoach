<script lang="ts">
export default {
  name: 'CoachDetailsLoading',
};
</script>

<template>
  <div class="loading">
    <svg-spinners-ring-resize width="5em" height="5em" />
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
