<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import BaseButton from '../UI/BaseButton.vue';
import BaseWrapper from '../UI/BaseWrapper.vue';
import RefreshIcon from '../icons/RefreshIcon.vue';
import CoachItem from './CoachItem.vue';
import CoachFilter from './CoachFilter.vue';
import CoachesListNothingFound from './CoachesListNothingFound.vue';
import CoachListLoading from './CoachListLoading.vue';
import CoachListError from './CoachListError.vue';

export default {
  name: 'CoachList',
  setup() {
    const coachesStore = useCoachesStore();
    return {
      coachesStore,
    };
  },
  data: () => ({
    isAbleToReload: true,
  }),
  components: {
    BaseButton,
    RefreshIcon,
    BaseWrapper,
    CoachItem,
    CoachFilter,
    CoachesListNothingFound,
    CoachListLoading,
    CoachListError,
  },
  computed: {
    coaches() {
      return this.coachesStore.getFilteredCoaches;
    },
    stateMachine() {
      return this.coachesStore.stateMachine;
    },
  },
  methods: {
    reloadCoaches() {
      if (!this.isAbleToReload) return;
      this.throttleCall();

      this.coachesStore.reloadCoaches();
    },
    throttleCall() {
      this.isAbleToReload = false;

      setTimeout(() => {
        this.isAbleToReload = true;
      }, 2000);
    },
  },
  mounted() {
    this.coachesStore.fetchCoaches();
  },
};
</script>

<template>
  <!-- <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'">
      <Component :is="Component" />
    </Transition>
  </RouterView> -->
  <RouterView />
  <CoachFilter />
  <BaseWrapper>
    <div class="controls">
      <BaseButton
        class="circle"
        title="Reload"
        mode="flat square rounded"
        @click="reloadCoaches"
        :disabled="!isAbleToReload"
      >
        <RefreshIcon />
      </BaseButton>
    </div>
    <Transition mode="out-in">
      <CoachListLoading
        v-if="stateMachine.matches('loading')"
      />
      <CoachListError
        v-else-if="stateMachine.matches('error')"
        :errorMsg="coachesStore.getErrorMsg"
      />
      <Transition mode="out-in" v-else-if="stateMachine.matches('loaded')">
        <TransitionGroup tag="ul" class="coach-list" v-if="coaches.length > 0">
          <CoachItem
            v-for="coach in coaches"
            :key="coach.id"
            :coach="coach"
          />
        </TransitionGroup>
        <CoachesListNothingFound v-else />
      </Transition>
    </Transition>
  </BaseWrapper>

</template>

<style lang="scss" scoped>
@use '@/colors.scss';

  .controls {
    display:flex;
    justify-content: flex-end;
    padding:0 0 10px 0;
    align-items: center;
    border-bottom: 2px solid colors.$gray;
  }
  .coach-list {
    display:flex;
    flex-direction: column;
    gap:20px;
    padding:20px;
  }
  .v-enter-from, .v-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
  .v-enter-to, .v-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .v-enter-active, .v-leave-active, .v-move {
    transition: all .2s ease;
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
