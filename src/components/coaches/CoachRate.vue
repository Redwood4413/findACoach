<script lang="ts">
import { useReviewsStore } from '@/stores/ReviewsStore';

export default {
  name: 'CoachRate',
  setup() {
    const reviewsStore = useReviewsStore();
    return { reviewsStore };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    rate() {
      return this.reviewsStore.getRate;
    },
    reviews() {
      return this.reviewsStore.getReviews;
    },
    reviewsQuantity() {
      return this.reviews.length;
    },
    reviewString(): string {
      // eslint-disable-next-line no-nested-ternary
      return this.reviewsQuantity === 0
        ? 'No reviews yet.'
        : this.reviewsQuantity === 1
        ? `Based on ${this.reviewsQuantity} review.`
        : `Based on ${this.reviewsQuantity} reviews.`;
    },
    pointsString(): string {
      return this.reviewsQuantity
        ? `Rate ${this.rate}/5`
        : 'No reviews yet.';
    },
  },
};
</script>

<template>
  <div class="coach-rate">
    <div class="rate" :title="pointsString">
      <CoachRatePoint
        v-for="index in 5"
        :key="index"
        :index="index"
        :rate="rate" />
    </div>
    <span class="stats">{{ reviewString }}</span>
  </div>
</template>

<style lang="scss" scoped>
.coach-rate {
  display: flex;
  gap: 5px;
  flex-direction: column;
  .rate {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .stats {
    font-size: small;
    color: $gray;
  }
}
</style>
