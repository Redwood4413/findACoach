<script lang="ts">

export default {
  name: 'CoachRatePoint',
  props: {
    rate: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    isFilled(index: number): boolean {
      if (index - 1 < this.rate) {
        return true;
      }
      return false;
    },
    filledClass(index: number): string {
      return this.isFilled(index) ? 'filled' : '';
    },
  },

};
</script>

<template>
  <div :class="`point ${filledClass(index)}`" />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

.point {
  background: colors.$foreground-1;
  height:13px;
  width:13px;
  border-radius: 50%;
  &.filled {
    background: colors.$strong-green;
  }
}

</style>
