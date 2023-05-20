<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'CoachReview',
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
      if (index - 1 < this.points) {
        return true;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters({
      getRate: 'coaches/getRate',
      getReviews: 'coaches/getReviews',
      reviewsQuantity: 'coaches/reviewsQuantity',
    }),
    filled(): Function {
      return (index: number): string => (this.isFilled(index) ? 'filled' : '');
    },
    reviewString(): string {
      // eslint-disable-next-line no-nested-ternary
      return this.reviewsCount === 0 ? 'No reviews yet.'
        : this.reviewsCount === 1 ? `Based on ${this.reviewsCount} review.`
          : `Based on ${this.reviewsCount} reviews.`;
    },
  },
  mounted() {
    this.points = this.getRate(this.id);
    this.reviewsCount = this.reviewsQuantity(this.id);
  },
};
</script>

<template>
  <div class="coach-rate">
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
