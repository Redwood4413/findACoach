<script lang="ts">
import { mapGetters } from 'vuex';
import BaseWrapper from '../UI/BaseWrapper.vue';

export default {
  name: 'CoachFilter',
  components: { BaseWrapper },
  data: () => ({
    checked: [] as string[],
    isAllChecked: true as boolean,
  }),
  methods: {
    switchAll() {
      if (this.isAllChecked) {
        this.checked = [];
        this.isAllChecked = false;
        this.emitEvent();
      } else {
        this.checked = this.areas;
        this.isAllChecked = true;
        this.emitEvent();
      }
    },
    emitEvent() {
      this.$emit('check', this.checked);
    },
  },
  watch: {
    checked() {
      if (this.checked.length !== this.areas.length) {
        this.isAllChecked = false;
      } else {
        this.isAllChecked = true;
      }
    },
  },
  computed: {
    ...mapGetters('coaches', ['areas']),
    formattedText() {
      return (index: number): string => {
        const firstChar = this.areas[index].charAt(0);
        const rest = this.areas[index].slice(1);
        return firstChar.toUpperCase() + rest.toLowerCase();
      };
    },
  },
  beforeMount() {
    this.checked = this.$store.getters['coaches/areas'];
    this.emitEvent();
  },
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
      <div
        class="option"
        v-for="(area, index) in areas"
        :key="index">
        <input
          type="checkbox"
          :id="area"
          :value="area"
          v-model="checked"
          @change="emitEvent"
        />
        <label :for="area">{{ formattedText(index) }}</label>
      </div>
    </div>
  </BaseWrapper>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.base-wrapper {
  text-align: left;
}
.section-title {
  color: colors.$foreground-4;
  padding:0.5rem 0;
  font-size: x-small;
  text-transform: uppercase;
}
.input-wrapper {
  user-select: none;
  display:flex;
  flex-wrap: wrap;
  gap:5px;

  .option {
    display:flex;
    label {
      cursor: pointer;
      border-radius: 5rem;
      padding:0.3rem 0.8rem;
      transition: background .1s ease-in-out;
      border: 2px solid colors.$strong-green;
      font-size: small;
      &:hover {
        background: colors.$strong-gray;
      }
    }
    input {
      display:none;
    }
    input:checked + label {
      background: colors.$strong-green;
    }
  }
}
</style>
