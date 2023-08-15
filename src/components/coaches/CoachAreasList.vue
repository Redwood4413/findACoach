<script lang="ts">
import { PropType } from 'vue';
import CoachAreasItem from './CoachAreasItem.vue';

export default {
  name: 'CoachAreasList',
  props: {
    areas: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  components: { CoachAreasItem },
};
</script>

<template>
  <ul class="areas-list">
    <span class="section-title">areas:</span>
    <div class="list-wrapper">
      <CoachAreasItem
        v-for="(area, index) in areas"
        :key="index"
        :area="area"
      />
    </div>
  </ul>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.areas-list {
    display:flex;
    flex-direction: column;
    min-width:200px;
    padding:0;
    .list-wrapper {
      display:flex;
      place-items: center;
      flex-wrap: wrap;
      gap:5px;
    }
  }
</style>
