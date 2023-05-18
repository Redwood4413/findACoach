<script lang="ts">
import { mapGetters } from 'vuex';
import BaseButton from '../UI/BaseButton.vue';
import BaseWrapper from '../UI/BaseWrapper.vue';
import RefreshIcon from '../icons/RefreshIcon.vue';
import CoachItem from './CoachItem.vue';
import CoachFilter from './CoachFilter.vue';
import CoachesListNothingFound from './CoachesListNothingFound.vue';

export default {
  name: 'CoachList',
  components: {
    BaseButton,
    RefreshIcon,
    BaseWrapper,
    CoachItem,
    CoachFilter,
    CoachesListNothingFound,
  },
  computed: {
    ...mapGetters('coaches', ['coaches']),
  },
  methods: {
    filterCoaches(checked: string[]) {
      this.$store.commit('coaches/setFilter', checked);
    },
  },
};
</script>

<template>
  <RouterView />
  <CoachFilter @check="filterCoaches" />
  <BaseWrapper>
    <div class="controls">
      <BaseButton title="Refresh">
        <RefreshIcon />
      </BaseButton>
    </div>
    <Transition mode="out-in">
      <TransitionGroup tag="ul" class="coach-list" v-if="coaches.length > 0">
        <CoachItem
          v-for="coach in coaches"
          :key="coach.id"
          :coach="coach"
        />
      </TransitionGroup>
      <CoachesListNothingFound v-else />
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

</style>
