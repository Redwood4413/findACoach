<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';

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
};
</script>

<template>
  <div class="coach-reviews" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <CoachReviewsList :coachId="id" />
  </div>
  <NotFound
    element="Coach"
    v-else-if="
      coachesStore.stateMachine.matches('loaded') && !isFound
    " />
</template>

<style lang="scss" scoped>
.coach-reviews {
  width: 100%;
  min-height: inherit;
}
</style>
