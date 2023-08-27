<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import BaseWrapper from '../UI/BaseWrapper.vue';

export default {
  name: 'CoachFilter',
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },
  data: () => ({
    checked: [] as string[],
    isAllChecked: true as boolean,
  }),
  methods: {
    switchAll() {
      if (this.isAllChecked) {
        this.checked = [];
        this.isAllChecked = false;
      } else {
        this.checked = this.areas;
        this.isAllChecked = true;
      }
      this.filterCoaches();
    },
    filterCoaches() {
      this.coachesStore.setFilter(this.checked);
    },
  },
  watch: {
    'coachesStore.stateMachine': function checkState(state) {
      if (state.value !== 'loaded') return;

      this.checked = this.areas;
      this.filterCoaches();
    },
    checked() {
      if (this.checked.length !== this.areas.length) {
        this.isAllChecked = false;
      } else {
        this.isAllChecked = true;
      }
    },
  },
  computed: {
    areas() {
      return this.coachesStore.getUniqueAreas;
    },
  },
  mounted() {
    this.checked = this.coachesStore.getFilterArray;
  },
  components: { BaseWrapper },
};
</script>

<template>
  <BaseWrapper>
    <h2>Find your coach</h2>
    <span class="section-title">filter:</span>
    <div class="input-wrapper">
      <div class="option">
        <input type="checkbox" id="ruleALl" v-model="isAllChecked" />
        <label for="ruleAll" @click="switchAll" @keydown="switchAll">All</label>
      </div>
      <div class="option" v-for="(area, index) in areas" :key="index">
        <input
          type="checkbox"
          :id="area"
          :value="area"
          v-model="checked"
          @change="filterCoaches"
        />
        <label :for="area">{{ area }}</label>
      </div>
    </div>
  </BaseWrapper>
</template>

<style lang="scss" scoped>
.base-wrapper {
  text-align: left;
}
.section-title {
  color: $foreground-4;
  padding: 0.5rem 0;
  font-size: x-small;
  text-transform: uppercase;
}
.input-wrapper {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .option {
    display: flex;
    label {
      cursor: pointer;
      border-radius: 5rem;
      padding: 0.3rem 0.8rem;
      text-transform: capitalize;
      transition: background 0.1s ease-in-out;
      border: 2px solid $strong-green;
      font-size: small;
      &:hover {
        background: $background-4;
      }
    }
    input {
      display: none;
    }
    input:checked + label {
      background: $strong-green;
    }
  }
}
</style>
