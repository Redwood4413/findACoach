<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import { useAuthStore } from '@/stores/AuthStore';
import supabase from '@/lib/supabaseClient';
import ShortUniqueId from 'short-unique-id';
import { useReviewsStore } from '@/stores/ReviewsStore';
import { useMachine } from '@xstate/vue';
import sendingMachine from '@/machines/sendingMachine';
import CoachWrapperHeader from './CoachWrapperHeader.vue';
import NotFound from '../NotFound.vue';
import CoachAddReviewForm from './CoachAddReviewForm.vue';
import BaseSuccess from '../UI/BaseSuccess.vue';
import BaseError from '../UI/BaseError.vue';

export default {
  name: 'CoachAddReview',
  props: {
    id: {
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
      coachesStore, authStore, reviewsStore, state, send,
    };
  },
  methods: {
    async sendData(data: Review) {
      this.send('SEND');
      const uid = new ShortUniqueId({ length: 8 });

      const review: Review = {
        reviewId: uid(),
        userId: this.id,
        authorId: this.authStore.getUserId,
        description: data.description,
        rate: data.rate,
        createdAt: Date.now(),
      };

      try {
        const { error } = await supabase.from('reviews').insert(review);
        if (error) {
          console.log(error);
          throw new Error(error.message);
        }
        this.send('SUCCESS');
        await this.reviewsStore.reloadReviews();

        setTimeout(() => {
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
  },
  provide() {
    return { state: this.state.value };
  },
  components: {
    CoachWrapperHeader,
    NotFound,
    CoachAddReviewForm,
    BaseSuccess,
    BaseError,
  },
};
</script>

<template>
  <div class="add-review" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <Transition mode="out-in">
      <CoachAddReviewForm
        @add-review="sendData"
        v-if="state.matches('empty')"
      />
      <BaseSuccess v-else-if="state.matches('sent')">
        <h3>Your review has been added.</h3>
      </BaseSuccess>
      <BaseError v-else-if="state.matches('error')">
        Error! {{ errorMsg }}
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
.add-review {
  padding: 1.5em;
  width:100%;
}
</style>
