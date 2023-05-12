<script lang="ts">
export default {
  name: 'BaseRouterLink',
  props: {
    mode: {
      type: String,
      default() {
        return '';
      },
    },
    color: {
      type: String,
      default() {
        return '';
      },
    },
    path: {
      type: String,
      required: true,
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
    :to="path"
    :class="`${flatClass} ${roundedClass} ${sharpClass} ${orangeClass}`">
    <slot />
  </RouterLink>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

 a {
  background: colors.$strong-gray;
  border-radius: 8px;
  padding:0.5rem 1rem;
  max-height:50px;
  transition: filter .1s ease-in-out;
  font-size: small;
  &.flat{
    border-radius: 0;
    background: none;
    border: 0;
  }
  &.rounded {
    border-radius:5rem;
  }
  &.sharp {
    border-radius:0;
  }
  &.orange {
    background: colors.$orange;
  }
  &:hover {
    filter: brightness(90%);
  }
}
</style>
