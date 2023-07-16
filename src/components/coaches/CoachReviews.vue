<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import NotFound from '../NotFound.vue';
import CoachAvatar from './CoachAvatar.vue';
import CoachReviewsList from './CoachReviewsList.vue';

export default {
  name: 'CoachContact',
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
    fullName(): string {
      return `${this.coach?.firstName} ${this.coach?.lastName}`;
    },
  },
  components: {
    NotFound,
    CoachAvatar,
    CoachReviewsList,
  },
};
</script>

<template>
  <div class="coach-reviews" v-if="isFound">
    <div class="coach">
      <CoachAvatar class="small" />
      <span class="name">{{ fullName }}</span>
    </div>
    <CoachReviewsList :id="id" />
  </div>
  <NotFound element="Coach" v-else />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.coach-reviews {
  padding:1.5em;
  .coach {
    display:flex;
    align-items: center;
    gap:1em;
    padding: 0 0 1em 0;
    border-bottom: 2px solid colors.$background-4;
    .name {
      font-size: large;
      font-weight: 500;
    }
  }
}
</style>
