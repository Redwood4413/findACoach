<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import NotFound from '../NotFound.vue';
import CoachReviewsList from './CoachReviewsList.vue';

import CoachWrapperHeader from './CoachWrapperHeader.vue';

export default {
  name: 'CoachReviews',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },
  computed: {
    coach() {
      const coach = this.coachesStore.getCoach(this.id);
      return coach;
    },
    isFound(): boolean {
      return !!this.coach;
    },
  },
  components: {
    NotFound,
    CoachReviewsList,
    CoachWrapperHeader,
  },
};
</script>

<template>
  <div class="coach-reviews" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <CoachReviewsList :coachId="id" />
  </div>
  <NotFound element="Coach" v-else />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

.coach-reviews {
  padding:1.5em;
}
</style>
