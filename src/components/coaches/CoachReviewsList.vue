<script lang="ts">

import { useReviewsStore } from '@/stores/ReviewsStore';
import CoachReviewsItem from './CoachReviewsItem.vue';

import NotFound from '../NotFound.vue';

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
      return this.reviewsStore.getReviews(this.coachId);
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
  components: { CoachReviewsItem, NotFound },
};
</script>

<template>
  <ul class="reviews-list" v-if="reviews.length > 0">
    <CoachReviewsItem
      v-for="(review, index) in reviews"
      :key="index"
      :review="review"
      :quantity="userReviewsQuantity(review.authorId)"
    />
  </ul>
  <NotFound element="Reviews" v-else />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

.reviews-list {
  display:flex;
  padding:0;
  gap:1.5em;
  flex-direction: column;
}
</style>
