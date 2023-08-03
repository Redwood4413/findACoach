<script lang="ts">
import SvgSpinnersRingResize from '../icons/animated/SvgSpinnersRingResize.vue';

export default {
  name: 'CoachRateLoading',
  components: { SvgSpinnersRingResize },
};
</script>

<template>
  <div class="info">
    <SvgSpinnersRingResize />
  </div>
</template>

<style lang="scss" scoped>
  .info {
    padding:5em;
    display:flex;
    flex-direction: column;
    place-items: center;
  }
</style>
