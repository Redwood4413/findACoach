<script lang="ts">
import BaseButton from '../UI/BaseButton.vue';

export default {
  name: 'CoachAddReviewFormRate',
  emits: ['change'],
  props: {
    rate: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  methods: {
    emitRate(rate: number) {
      this.$emit('change', rate);
    },
    filledClass(index: number) {
      return this.rate > index - 1 ? 'filled' : '';
    },
  },
  components: { BaseButton },
};
</script>

<template>
  <div class="rate">
    <div class="wrapper">
      <label type="text" for="rate">Rate:</label>
      <span class="info">{{ rate }}/{{ max }}</span>
    </div>
    <ul class="buttons" id="rate">
      <li class="item" v-for="i in max" :key="i">
        <BaseButton
          :title="`${i}/${max}`"
          @click="emitRate(i)"
          :class="`flat ${filledClass(i)}`"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.rate {
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.3em;
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    & > * {
      font-weight: 200;
    }
    .info {
      font-size: small;
    }
  }
  .buttons {
    display: flex;
    padding: 0;
    margin: 0;
    gap: 0.5em;
    .item {
      display: flex;
      button {
        border-radius: 50%;
        padding: 0.6em;
        outline-offset: 0.3em;
        background: $foreground-1;
        &.filled {
          background: $strong-green;
        }
      }
    }
  }
}
</style>
