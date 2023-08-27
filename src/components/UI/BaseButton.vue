<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    mode: {
      type: String,
      default: '',
    },
  },
  computed: {
    flatClass(): string {
      const regex = /flat/;
      const found = regex.test(this.mode);
      return found ? 'flat' : '';
    },
    roundedClass(): string {
      const regex = /rounded/;
      const found = regex.test(this.mode);
      return found ? 'rounded' : '';
    },
    squareClass(): string {
      const regex = /square/;
      const found = regex.test(this.mode);
      return found ? 'square' : '';
    },
  },
};
</script>

<template>
  <button type="button" :class="`${flatClass} ${roundedClass} ${squareClass}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  background: $strong-gray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  max-height: 50px;
  font-size: small;
  transition: background 0.1s ease-in-out;
  &.flat {
    border-radius: 0;
    background: none;
    border: 0;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  &.red {
    background: $strong-red;
  }
  &.rounded {
    border-radius: 5rem;
  }
  &.circle {
    border-radius: 50%;
  }
  &.square {
    aspect-ratio: 1/1;
    height: 50px;
    padding: 0;
  }
  &.icon {
    padding: 0;
  }
  &.sharp {
    border-radius: 0;
  }
  &.bg-none {
    background: none;
  }
  &:not(:disabled):hover {
    filter: brightness(90%);
  }
}
</style>
