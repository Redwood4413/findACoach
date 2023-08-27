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
@use '@/variables.scss';

main {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: variables.$main-padding 0 0 0;
}
</style>
