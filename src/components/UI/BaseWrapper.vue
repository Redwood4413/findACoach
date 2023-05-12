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
@use '@/colors.scss';
.base-wrapper {
  display:flex;
  flex-direction: column;
  background: colors.$background-2;
  padding:20px;
  border-radius: 5px;
  width: 800px;
  -webkit-box-shadow: 5px 5px 0px 0px colors.$background-1;
  -moz-box-shadow: 5px 5px 0px 0px colors.$background-1;
  box-shadow: 5px 5px 0px 0px colors.$background-1;
}

@media (width <= 800px) {
  .base-wrapper {
    width:97vw;
  }
}
</style>
