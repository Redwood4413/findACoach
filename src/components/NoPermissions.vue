<script lang="ts">
export default {
  name: 'NoPermission',
};
</script>

<template>
  <BaseWrapper>
    <div class="no-permission">
      <material-symbols:sentiment-dissatisfied-rounded
        height="5em"
        width="5em" />
      <h3>You have no permissions to view this page.</h3>
      <BaseRouterLink mode="rounded" :to="{ name: 'home' }"
        >Home</BaseRouterLink
      >
    </div>
  </BaseWrapper>
</template>

<style lang="scss" scoped>
.no-permission {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
  h3 {
    text-wrap: balance;
  }
}
</style>
