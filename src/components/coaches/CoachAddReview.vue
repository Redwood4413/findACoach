<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import { useAuthStore } from '@/stores/AuthStore';
import CoachWrapperHeader from './CoachWrapperHeader.vue';
import NotFound from '../NotFound.vue';

import CoachAddReviewForm from './CoachAddReviewForm.vue';

interface Data {
  description: string,
  rate: number,
}

export default {
  name: 'CoachAddReview',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const coachesStore = useCoachesStore();
    const authStore = useAuthStore();
    return { coachesStore, authStore };
  },
  methods: {
    async sendData(data: Data) {
      const url = `${import.meta.env.VITE_FIREBASE_URL}reviews/${this.id}.json`;

      const review: Review = {
        authorId: this.authStore.getLoggedId,
        coachId: this.id,
        description: data.description,
        rate: data.rate,
        addedAt: Date.now(),
      };
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(review),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Failed! ${response.statusText}`);
        }
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
  },
  components: { CoachWrapperHeader, NotFound, CoachAddReviewForm },
};
</script>

<template>
  <div class="add-review" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <CoachAddReviewForm @add-review="sendData" />
  </div>
  <NotFound v-else element="Coach" />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.add-review {
  padding: 1.5em;
}
</style>
