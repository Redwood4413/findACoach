<script lang="ts">
export default {
  name: 'BaseWrapper',
};
</script>

<template>
  <div class="base-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-wrapper {
  display: flex;
  flex-direction: column;
  background: $background-2;
  padding: 20px;
  border-radius: 5px;
  width: 800px;
  -webkit-box-shadow: 5px 5px 0px 0px $background-1;
  -moz-box-shadow: 5px 5px 0px 0px $background-1;
  box-shadow: 5px 5px 0px 0px $background-1;
}

@media (width <= 825px) {
  .base-wrapper {
    width: 97vw;
  }
}
</style>
