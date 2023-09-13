<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';

export default {
  name: 'CoachList',
  setup() {
    const coachesStore = useCoachesStore();
    return {
      coachesStore,
    };
  },
  computed: {
    coaches() {
      return this.coachesStore.getFilteredCoaches;
    },
    stateMachine() {
      return this.coachesStore.stateMachine;
    },
  },
  mounted() {
    this.coachesStore.fetchCoaches();
  },
};
</script>

<template>
  <RouterView />
  <CoachFilter />
  <BaseWrapper>
    <div class="controls">
      <BaseThrottleButton
        title="Reload"
        mode="flat square rounded"
        @click="coachesStore.reloadCoaches">
        <ic:sharp-sync height="2em" width="2em" />
      </BaseThrottleButton>
    </div>
    <Transition mode="out-in">
      <CoachListLoading v-if="stateMachine.matches('loading')" />
      <CoachListError
        v-else-if="stateMachine.matches('error')"
        :errorMsg="coachesStore.getErrorMsg" />
      <Transition
        mode="out-in"
        v-else-if="stateMachine.matches('loaded')">
        <TransitionGroup
          tag="ul"
          class="coach-list"
          v-if="coaches.length > 0">
          <CoachListItem
            v-for="coach in coaches"
            :key="coach.userId"
            :coach="coach" />
        </TransitionGroup>
        <CoachesListNothingFound v-else />
      </Transition>
    </Transition>
  </BaseWrapper>
</template>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 10px 0;
  align-items: center;
  border-bottom: 2px solid $gray;
}
.coach-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
}
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 0.2s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
