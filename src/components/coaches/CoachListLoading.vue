<script lang="ts">
import SvgSpinnersRingResize from '../icons/animated/SvgSpinnersRingResize.vue';

export default {
  name: 'CoachListLoading',
  components: { SvgSpinnersRingResize },
};
</script>

<template>
  <div class="loading">
    <SvgSpinnersRingResize />
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
