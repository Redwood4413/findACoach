<script lang="ts">

export default {
  name: 'NotFound',
  props: {
    element: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="nothing-found">
    <h2>{{ element }} not found.</h2>
    <BaseRouterLink mode="rounded" :to="{ name: 'home' }">Return</BaseRouterLink>
  </div>
</template>

<style lang="scss" scoped>
  .nothing-found {
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height:300px;
    height:100%;
    width:100%;
  }
</style>
