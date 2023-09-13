<script lang="ts">
export default {
  name: 'CoachListError',
  props: {
    errorMsg: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="info">
    <material-symbols:error-circle-rounded />
    <h3>{{ errorMsg }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.info {
  padding: 1em;
  display: flex;
  flex-direction: column;
  place-items: center;
}
</style>
