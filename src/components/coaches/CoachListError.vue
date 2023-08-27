<script lang="ts">
import MaterialSymbolsErrorCircleRounded from '../icons/material-symbols/MaterialSymbolsErrorCircleRounded.vue';

export default {
  name: 'CoachListError',
  props: {
    errorMsg: {
      type: String,
      required: true,
    },
  },
  components: { MaterialSymbolsErrorCircleRounded },
};
</script>

<template>
  <div class="info">
    <MaterialSymbolsErrorCircleRounded />
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
