<script lang="ts">
import SvgSpinnersRingResize from '../icons/animated/SvgSpinnersRingResize.vue';

export default {
  name: 'CoachDetailsLoading',
  components: { SvgSpinnersRingResize },
};
</script>

<template>
  <div class="loading">
    <SvgSpinnersRingResize class="big" />
  </div>
</template>

<style lang="scss" scoped>
  .loading {
    display:flex;
    min-height: inherit;
    align-items: center;
    justify-content: center;
  }
</style>
