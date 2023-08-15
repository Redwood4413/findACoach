<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import { useAuthStore } from '@/stores/AuthStore';
import supabase from '@/lib/supabaseClient';
import { useReviewsStore } from '@/stores/ReviewsStore';
import CoachWrapperHeader from './CoachWrapperHeader.vue';
import NotFound from '../NotFound.vue';
import CoachAddReviewForm from './CoachAddReviewForm.vue';

export default {
  name: 'CoachEditReview',
  props: {
    id: {
      type: String,
      required: true,
    },
    reviewId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const coachesStore = useCoachesStore();
    const authStore = useAuthStore();
    const reviewsStore = useReviewsStore();
    return { coachesStore, authStore, reviewsStore };
  },
  methods: {
    async sendData(data: Review) {
      const review = {
        description: data.description,
        rate: data.rate,
        createdAt: Date.now(),
      };
      try {
        const { error } = await supabase.from('reviews')
          .update(review)
          .eq('reviewId', this.reviewId);

        if (error) {
          throw new Error(`Failed! ${error.message}`);
        }
        await this.reviewsStore.reloadReviews();
        this.$router.replace({ name: 'reviews' });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    coach() {
      return this.coachesStore.getCoach(this.id);
    },
    isFound() {
      return !!this.coach;
    },
    review() {
      return this.reviewsStore.getReviewById(this.reviewId);
    },
  },
  components: { CoachWrapperHeader, NotFound, CoachAddReviewForm },
};
</script>

<template>
  <div class="edit-review" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <CoachAddReviewForm :review="review" @add-review="sendData" />
  </div>
  <NotFound v-else element="Coach" />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.edit-review {
  padding: 1.5em;
  width:100%;
}
</style>
