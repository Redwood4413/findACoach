<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import { useAuthStore } from '@/stores/AuthStore';
import supabase from '@/lib/supabaseClient';
import { useReviewsStore } from '@/stores/ReviewsStore';
import { useMachine } from '@xstate/vue';
import sendingMachine from '@/machines/sendingMachine';
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
  data: () => ({
    errorMsg: '',
  }),
  setup() {
    const coachesStore = useCoachesStore();
    const authStore = useAuthStore();
    const reviewsStore = useReviewsStore();
    const { state, send } = useMachine(sendingMachine);

    return {
      coachesStore,
      authStore,
      reviewsStore,
      state,
      send,
    };
  },
  methods: {
    async sendData(data: Review) {
      this.send('SEND');
      const review = {
        description: data.description,
        rate: data.rate,
        editedAt: Date.now(),
      };
      try {
        const { error } = await supabase.from('reviews')
          .update(review)
          .eq('reviewId', this.reviewId);
        if (error) {
          throw new Error(error.message);
        }
        this.send('SUCCESS');
        await this.reviewsStore.reloadReviews();
        setTimeout(() => {
          if (this.$route.name !== 'edit-review') return;
          this.$router.replace({ name: 'reviews' });
        }, this.state.context.timing);
      } catch (error) {
        this.errorMsg = error as string;
        this.send('ERROR');
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
    <Transition mode="out-in">
      <CoachAddReviewForm
        :review="review"
        @add-review="sendData"
        v-if="state.matches('empty')"
        :state="state.value"
      />
      <BaseSuccess v-else-if="state.matches('sent')">
        <h3>Your review has been edited.</h3>
      </BaseSuccess>
      <BaseError v-else-if="state.matches('error')">
        {{ errorMsg }}
      </BaseError>
    </Transition>
  </div>
  <NotFound v-else element="Coach" />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.edit-review {
  padding: 1.5em;
  width:100%;
}
</style>
