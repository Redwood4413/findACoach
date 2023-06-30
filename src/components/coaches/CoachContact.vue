<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import NotFound from '../NotFound.vue';

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
  },
  components: { NotFound },
};
</script>

<template>
  <BaseDialog returnTo="contact">
    <template v-if="isFound">
      <h2>{{ coach.firstName }}</h2>
    </template>
    <NotFound element="Coach" v-else />
  </BaseDialog>
</template>
