<script lang="ts">

export default {
  name: 'BaseDropdownMenu',
};
</script>

<template>
  <div class="dropdown-menu">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
@import '@/variables.scss';
  .dropdown-menu {
    position: absolute;
    top:100%;
    z-index: map-get($header-map, zIndex);
    left:50%;
    width:100%;
    overflow: hidden;
    display:flex;
    flex-direction: column;
    justify-content: center;
    transform: translate(-50%, 5%);
    border:2px solid colors.$gray;
    border-radius: 10px;
    background: colors.$background-1;
  }

</style>
