<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    mode: {
      type: String,
      default: '',
    },
    routeName: {
      type: String,
      default: null,
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
    routerObject() {
      return { name: this.routeName };
    },
  },
};
</script>

<template>
  <RouterLink
    v-if="routeName"
    type="button"
    :to="routerObject"
    :class="`${flatClass} ${squareClass} ${roundedClass}`">
    <slot />
  </RouterLink>
  <button
    v-else
    type="button"
    :class="`${flatClass} ${roundedClass} ${squareClass}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
a {
  &.flat {
    text-decoration: underline;
  }
}
button{
  background: colors.$strong-gray;
  display:flex;
  justify-content: center;
  align-items: center;
  padding:0.5rem 1rem;
  padding:10px;
  max-height:50px;
  transition: background .1s ease-in-out;
  &.flat{
    border-radius: 0;
    background: none;
    border: 0;
    &:hover {
      background: rgba(0,0,0,0.2);
    }
  }
  &.rounded {
    border-radius:1rem;
  }
  &.square {
    aspect-ratio: 1/1;
    height:50px;
  }
  &.sharp {
    border-radius:0;
  }
  &:hover {
    filter: brightness(90%);
  }
}

</style>
