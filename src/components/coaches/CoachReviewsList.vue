<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import CoachReviewsItem from './CoachReviewsItem.vue';

export default {
  name: 'CoachReviewsList',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const coachStore = useCoachesStore();
    return { coachStore };
  },
  computed: {
    reviews() {
      return this.coachStore.getReviews(this.id);
    },
  },
  components: { CoachReviewsItem },
};
</script>

<template>
  <ul class="reviews-list">
    <CoachReviewsItem
      v-for="(review, index) in reviews"
      :key="index"
      :review="review" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

</style>
