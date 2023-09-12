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
      const uid = new ShortUniqueId({ length: 8 });

      const review: Review = {
        reviewId: uid(),
        userId: this.id,
        authorId: this.authStore.userId,
        description: data.description,
        rate: data.rate,
        createdAt: Date.now(),
      };

      try {
        const { error } = await supabase
          .from('reviews')
          .insert(review);
        if (error) {
          throw new Error(error.message);
        }
        this.send('SUCCESS');
        await this.reviewsStore.reloadReviews();

        setTimeout(() => {
          if (this.$route.name !== 'add-review') return;
          this.$router.replace({
            name: 'reviews',
            hash: review.reviewId,
          });
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
  async beforeRouteEnter(to, _, next) {
    const reviewsStore = useReviewsStore();
    const authStore = useAuthStore();

    await reviewsStore.fetchReviews(to.params.id as string);

    if (authStore.userId === to.params.id) {
      next({ name: 'no-permissions' });
      return;
    }
    if (reviewsStore.isReviewFound(authStore.userId)) {
      next({ name: 'no-permissions' });
      return;
    }
    next();
  },
  components: {
    CoachWrapperHeader,
    NotFound,
    CoachAddReviewForm,
  },
};
</script>

<template>
  <div class="add-review" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <Transition mode="out-in">
      <CoachAddReviewForm
        @add-review="sendData"
        :state="state.value"
        v-if="state.matches('empty')" />
      <BaseSuccess v-else-if="state.matches('sent')">
        <h3>Your review has been added.</h3>
      </BaseSuccess>
      <BaseError v-else-if="state.matches('error')">
        {{ errorMsg }}
      </BaseError>
    </Transition>
  </div>
  <NotFound v-else element="Coach" />
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.add-review {
  padding: 1.5em;
  width: 100%;
}
</style>
