<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import NotFound from '../NotFound.vue';
import CoachContactForm from './CoachContactForm.vue';

import CoachWrapperHeader from './CoachWrapperHeader.vue';

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
  data: () => ({}),
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
    CoachWrapperHeader,
  },
};
</script>

<template>
  <div class="coach-contact" v-if="isFound">
    <CoachWrapperHeader :id="id" />
    <CoachContactForm @send="submitData" />
  </div>
  <NotFound element="Coach" v-else />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.coach-contact {
  padding: 1.5em;
  width: 100%;
}
</style>
