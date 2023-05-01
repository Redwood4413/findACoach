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
@import "@/variables.scss";

main {
  padding: $main-padding;
}

</style>
