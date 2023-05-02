<script lang="ts">
export default {
  name: 'TheHeaderSidebar',
  props: ['expanded']
};
</script>

<template>
  <div class="side-bar">

  </div>
</template>

<style lang="scss" scoped>
  .side-bar {
    position: fixed;
    right:0;
    height:100%;
    width: 400px;
    background: #000;
  }
  @media (width <= 500px) {
    .side-bar {
      width:80vw;
    }
  }
</style>
