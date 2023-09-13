<script lang="ts">
export default {
  name: 'BaseSuccess',
};
</script>

<template>
  <div class="success-animation">
    <svg
      class="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52">
      <circle
        class="checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none" />
      <path
        class="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$success-green: rgb(49, 139, 52);
$success-soft-green: rgb(70, 209, 75);
.success-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.checkmark {
  width: 100px;
  border-radius: 50%;
  stroke-width: 2;
  stroke: $success-green;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px $success-green;
  animation:
    fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  position: relative;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke: $success-green;
  stroke-miterlimit: 10;
  fill: $success-soft-green;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px $success-green;
  }
}
</style>
