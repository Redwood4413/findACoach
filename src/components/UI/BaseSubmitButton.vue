<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'BaseSubmitButton',
  props: {
    isValid: {
      type: Boolean,
      required: true,
    },
    state: {
      type: String as PropType<SendEvents>,
      default: 'empty',
    },
  },
  data: () => ({
    shake: false,
    timing: 300, // ms
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
    :style="{ animationDuration: timing + 'ms' }">
    <template v-if="state === 'empty'">
      <span>Send</span>
      <material-symbols:send-outline-rounded height="1.5em" />
    </template>
    <SvgSpinnersRingResize v-else-if="state === 'sending'" />
  </button>
</template>

<style lang="scss" scoped>
.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  width: 6.5em;
  border-radius: 5em;
  padding: 0.5em 1em;
  background: rgb(207, 111, 30);
  background: -moz-linear-gradient(
    145deg,
    $strong-orange 0%,
    $strong-red 100%
  );
  background: -webkit-linear-gradient(
    145deg,
    $strong-orange 0%,
    $strong-red 100%
  );
  background: linear-gradient(
    145deg,
    $strong-orange 0%,
    $strong-red 100%
  );
  &.shake {
    animation: jump-shaking ease-in-out;
  }
  &:hover {
    opacity: 0.8;
  }
}

@keyframes jump-shaking {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(-5px) rotate(17deg);
  }
  75% {
    transform: translateY(-5px) rotate(-17deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
</style>
