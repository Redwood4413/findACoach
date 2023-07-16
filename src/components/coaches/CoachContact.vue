<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import NotFound from '../NotFound.vue';
import CoachContactForm from '../UI/CoachContactForm.vue';

import CoachAvatar from './CoachAvatar.vue';

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
  data: () => ({

  }),
  methods: {
    submitData(data) {
      console.log(data);
    },
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
  // beforeRouteLeave(to, from, next) {
  //   console.log(to, from, next);
  // },
  components: {
    NotFound,
    CoachContactForm,
    CoachAvatar,
  },
};
</script>

<template>
  <div class="coach-contact" v-if="isFound">
    <div class="coach">
      <CoachAvatar class="small" />
      <span class="name">{{ fullName }}</span>
    </div>
    <CoachContactForm @send="submitData" />
  </div>
  <NotFound element="Coach" v-else />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.coach-contact {
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
