<script lang="ts">
import supabase from '@/lib/supabaseClient';
import { useMachine } from '@xstate/vue';
import sendingMachine from '@/machines/sendingMachine';
import { useAuthStore } from '@/stores/AuthStore';
import { useCoachesStore } from '@/stores/CoachesStore';

export default {
  name: 'CoachRegistration',
  setup() {
    const authStore = useAuthStore();
    const coachesStore = useCoachesStore();

    const { state, send } = useMachine(sendingMachine);
    return { state, send, authStore, coachesStore };
  },
  methods: {
    async registerCoach(coach: Coach) {
      try {
        const updatedUser = {
          isCoach: true,
        };
        const { error } = await supabase
          .from('users')
          .update(updatedUser)
          .eq('userId', coach.userId);

        if (error) {
          throw new Error(`Failed! ${error.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.authStore.isCoach) {
      this.$router.replace({ name: 'no-permissions' });
      return;
    }

    this.coachesStore.fetchCoaches();
  },
};
</script>

<template>
  <BaseWrapper>
    <div class="coach-registration">
      <div class="header">
        <h2 class="header-greetings">
          Hello,
          <span class="fullname">{{ authStore.fullName }}!</span>
        </h2>
        <h3>Register and help others thrive in the IT Industry! </h3>
      </div>
      <CoachRegistrationForm @submit="registerCoach" />
    </div>
  </BaseWrapper>
</template>

<style lang="scss" scoped>
$gap: 2em;
$border: 2px solid $foreground-4;
.coach-registration {
  display: flex;
  text-align: left;
  padding: 1em 0;
  gap: $gap;
  & > * {
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: column;
    text-wrap: balance;
    gap: 1em;
    padding: $gap;
    border-right: $border;
    h2 {
      margin: 0;
      .fullname {
        background: $foreground-0;
        background-clip: text;
        font-size: smaller;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    h3 {
      font-weight: 200;
      margin: 0;
    }
  }
}
@media (width < 600px) {
  .coach-registration {
    flex-direction: column;
    .header {
      border-right: 0;
      border-bottom: $border;
    }
  }
}
</style>
