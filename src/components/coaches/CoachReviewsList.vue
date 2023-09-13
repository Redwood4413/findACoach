<script lang="ts">
import { useReviewsStore } from '@/stores/ReviewsStore';

export default {
  name: 'CoachReviewsList',
  props: {
    coachId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    matchingEl: null,
  }),
  setup() {
    const reviewsStore = useReviewsStore();
    return { reviewsStore };
  },
  computed: {
    reviews() {
      return this.reviewsStore.getReviews;
    },
    reviewsQuantity() {
      return this.reviews.length;
    },
  },
  methods: {
    scrollToReview() {
      const { hash } = this.$route;
      if (!hash) return;

      const element = this.matchingEl as HTMLLIElement | null;
      if (!element) return;

      element.scrollIntoView({ behavior: 'smooth' });
    },
    isHighlighted(reviewId: string) {
      return this.$route.hash === `#${reviewId}`;
    },
  },
  mounted() {
    this.scrollToReview();
  },
};
</script>

<template>
  <Transition mode="out-in">
    <ul
      class="reviews-list"
      v-if="
        reviewsQuantity && reviewsStore.stateMachine.matches('loaded')
      ">
      <CoachReviewsListItem
        v-for="(review, index) in reviews"
        :key="index"
        :highlight="isHighlighted(review.reviewId)"
        :ref="
          (el: Element) => {
            if (`#${review.reviewId}` === $route.hash) {
              matchingEl = el?.$el;
              return;
            }
            return null;
          }
        "
        :review="review" />
    </ul>
    <CoachReviewsListLoading
      v-else-if="reviewsStore.stateMachine.matches('loading')" />
    <NotFound element="Reviews" v-else />
  </Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.reviews-list {
  display: flex;
  padding: 0;
  gap: 1.5em;
  flex-direction: column;
}
</style>
