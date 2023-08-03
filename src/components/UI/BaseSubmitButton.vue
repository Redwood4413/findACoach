<script lang="ts">

export default {
  name: 'BaseSubmitButton',
  props: {
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    shake: false as boolean,
    timing: 300 as number, // ms
  }),
  methods: {
    toggleShake() {
      requestAnimationFrame(() => {
        if (this.isValid) return;
        this.shake = true;

        setTimeout(() => {
          this.shake = false;
        }, this.timing);
      });
    },
  },
  computed: {
    shakeClass() {
      return this.shake ? 'shake' : '';
    },
  },
};
</script>

<template>
  <button
    @click="toggleShake"
    type="submit"
    :class="`submit ${shakeClass}`"
    :style="{ animationDuration: timing + 'ms' }"
  >
    <slot />
  </button>

</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.submit {
  display:flex;
  justify-content: center;
  align-items: center;
  gap:0.3em;
  border-radius: 5em;
  padding:0.5em 1em;
  background: rgb(207,111,30);
  background: -moz-linear-gradient(145deg, colors.$strong-orange 0%, colors.$strong-red 100%);
  background: -webkit-linear-gradient(145deg, colors.$strong-orange 0%, colors.$strong-red 100%);
  background: linear-gradient(145deg, colors.$strong-orange 0%, colors.$strong-red 100%);
  &.shake {
    animation: jump-shaking ease-in-out;
  }
  &:hover {
    opacity: 0.8;
  }
}

@keyframes jump-shaking {
  0% { transform: translateX(0) }
  25% { transform: translateY(-5px) }
  50% { transform: translateY(-5px) rotate(17deg) }
  75% { transform: translateY(-5px) rotate(-17deg) }
  100% { transform: translateY(0) rotate(0) }
}
</style>