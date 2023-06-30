<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';

export default {
  name: 'CoachReview',
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    points: 0 as number,
    reviewsCount: 0 as number,
  }),
  methods: {
    isFilled(index: number): boolean {
      if (index - 1 < this.rate) {
        return true;
      }
      return false;
    },
  },
  computed: {
    rate() {
      return this.coachesStore.getRate(this.id);
    },
    reviews() {
      return this.coachesStore.getReviews(this.id);
    },
    reviewsQuantity() {
      return this.coachesStore.getReviewsQuantity(this.id);
    },
    filled(): Function {
      return (index: number): string => (this.isFilled(index) ? 'filled' : '');
    },
    reviewString(): string {
      // eslint-disable-next-line no-nested-ternary
      return this.reviewsQuantity === 0 ? 'No reviews yet.'
        : this.reviewsQuantity === 1 ? `Based on ${this.reviewsQuantity} review.`
          : `Based on ${this.reviewsQuantity} reviews.`;
    },
    pointsString(): string {
      return this.reviewsCount ? `Rate ${this.points}/5` : 'No reviews yet.';
    },
  },
};
</script>

<template>
  <div class="coach-rate" :title="pointsString">
    <div class="rate">
      <span :class="`point ${filled(index)}`" v-for="(index) in 5" :key="index" />
    </div>
    <span class="stats">{{ reviewString }}</span>
  </div>

</template>

<style lang="scss" scoped>
@use '@/colors.scss';
  .coach-rate {
    display:flex;
    gap:5px;
    flex-direction: column;
  .rate{
    display:flex;
    align-items: center;
    gap:5px;
    .point {
      background: colors.$foreground-1;
      height:13px;
      width:13px;
      border-radius: 50%;
      &.filled {
        background: colors.$red;
      }
    }
  }
  .stats {
    font-size: small;
    color: colors.$gray
  }
}
</style>
