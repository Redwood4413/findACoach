<script lang="ts">

export default {
  name: 'NoPermission',
};
</script>

<template>
  <BaseWrapper>
    <div class="no-permission">
      <h2>You have no permissions to view this page.</h2>
      <BaseRouterLink mode="rounded" :to="{ name: 'home' }">Home</BaseRouterLink>
    </div>
  </BaseWrapper>
</template>

<style lang="scss" scoped>
  .no-permission {
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height:300px;
    height:100%;
    width:100%;
  }
</style>
