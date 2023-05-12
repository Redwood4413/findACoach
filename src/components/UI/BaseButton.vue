<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    mode: {
      type: String,
      default() {
        return '';
      },
    },
  },
  computed: {
    flatClass(): string {
      return this.mode === 'flat' ? 'flat' : '';
    },
    roundedClass(): string {
      return this.mode === 'rounded' ? 'rounded' : '';
    },
  },
};
</script>

<template>
  <button type="button" :class="`${flatClass} ${roundedClass}`">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

button{
  background: colors.$strong-gray;
  display:flex;
  justify-content: center;
  align-items: center;
  padding:10px;
  max-height:50px;
}
  .flat{
    border-radius: 0;
    background: none;
    border: 0;
    transition: background 300ms ease-in-out;
  }
  .rounded {
    border-radius:5rem;
  }
</style>
