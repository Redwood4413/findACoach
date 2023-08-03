<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import CoachAvatar from './CoachAvatar.vue';

export default {
  name: 'CoachWrapperTitle',
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    coach() {
      return this.coachesStore.getCoach(this.id);
    },
    fullName() {
      return `${this.coach?.firstName} ${this.coach?.lastName}`;
    },
  },
  components: { CoachAvatar },
};
</script>

<template>
  <div class="coach-header">
    <CoachAvatar class="small" />
    <span class="name">{{ fullName }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.coach-header {
  display:flex;
  align-items: center;
  justify-content: center;
  gap:1em;
  padding: 0 0 1em 0;
  border-bottom: 2px solid colors.$background-4;
  .name {
    font-size: large;
    font-weight: 500;
  }
}
</style>
