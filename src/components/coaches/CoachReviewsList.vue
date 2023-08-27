<script lang="ts">
import { useReviewsStore } from '@/stores/ReviewsStore';
import CoachReviewsListItem from './CoachReviewsListItem.vue';

import NotFound from '../NotFound.vue';
import CoachReviewsListLoading from './CoachReviewsListLoading.vue';

export default {
  name: 'CoachReviewsList',
  props: {
    coachId: {
      type: String,
      required: true,
    },
  },
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
    userReviewsQuantity(authorId: string) {
      return this.reviewsStore.getAuthorReviews(authorId).length;
    },
  },
  components: { CoachReviewsListItem, NotFound, CoachReviewsListLoading },
};
</script>

<template>
  <Transition mode="out-in">
    <ul
      class="reviews-list"
      v-if="reviewsQuantity && reviewsStore.stateMachine.matches('loaded')"
    >
      <CoachReviewsListItem
        v-for="(review, index) in reviews"
        :key="index"
        :review="review"
        :quantity="userReviewsQuantity(review.authorId)"
      />
    </ul>
    <CoachReviewsListLoading
      v-else-if="reviewsStore.stateMachine.matches('loading')"
    />
    <NotFound element="Reviews" v-else />
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
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
