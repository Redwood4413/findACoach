<script lang="ts">
export default {
  name: 'BaseRouterLink',
  props: {
    mode: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: '',
    },
  },
  computed: {
    flatClass(): string {
      return this.mode === 'flat' ? 'flat' : '';
    },
    roundedClass(): string {
      return this.mode === 'rounded' ? 'rounded' : '';
    },
    sharpClass(): string {
      return this.mode === 'sharp' ? 'sharp' : '';
    },
    orangeClass(): string {
      return this.color === 'orange' ? 'orange' : '';
    },
  },
};
</script>

<template>
  <RouterLink
    :to="to"
    :class="`${flatClass} ${roundedClass} ${sharpClass} ${orangeClass}`"
  >
    <slot />
  </RouterLink>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

a {
  background: colors.$strong-gray;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  max-height: 50px;
  transition: filter 0.1s ease-in-out;
  font-size: small;
  white-space: nowrap;
  &.flat {
    border-radius: 0;
    background: none;
    border: 0;
    font-size: medium;
    text-decoration: underline;
    padding: 0;
  }
  &.rounded {
    border-radius: 5rem;
  }

  &.orange {
    background: colors.$orange;
  }
  &:hover {
    filter: brightness(90%);
  }
}
</style>
