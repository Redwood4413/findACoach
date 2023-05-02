<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    mode: String
  },
  computed: {
    buttonClass(): string {
      return this.mode === 'flat' ? 'flat' : '';
    },
  },
};
</script>

<template>
  <button type="button" :class="buttonClass">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button{
  background: rgb(59, 59, 59);
  display:flex;
  justify-content: center;
  align-items: center;
}
  .flat{
    border-radius: 0;
    background: none;
    border: 0;
    transition: background 300ms ease-in-out;
    &:hover{
      background: rgba(0,0,0,0.3);
    }
  }
</style>
