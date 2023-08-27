<script lang="ts">
export default {
  name: 'BaseThrottleButton',
  emits: ['click'],
  data: () => ({
    isAbleToReload: true,
    timeout: 2000,
  }),
  methods: {
    throttleCall() {
      if (!this.isAbleToReload) return;
      this.$emit('click');
      this.isAbleToReload = false;
      setTimeout(() => {
        this.isAbleToReload = true;
      }, this.timeout);
    },
  },
};
</script>

<template>
  <BaseButton type="button" :disabled="!isAbleToReload" @click="throttleCall">
    <slot />
  </BaseButton>
</template>

<style lang="scss" scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
