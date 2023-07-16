<script lang="ts">
import { PropType } from 'vue';
import { Review } from '@/stores/CoachesStore';

export default {
  name: 'CoachReviewsItem',
  props: {
    review: {
      type: Object as PropType<Review>,
      required: true,
    },
  },
};
</script>

<template>
  <li>{{ review.rate }}</li>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

</style>
