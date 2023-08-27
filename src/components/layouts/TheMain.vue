<script lang="ts">
export default {
  name: 'TheMain',
};
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: $main-padding 0 0 0;
}
</style>
