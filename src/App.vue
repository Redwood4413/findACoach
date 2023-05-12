<script lang="ts">
import TheHeader from './components/layouts/TheHeader.vue';
import TheMain from './components/layouts/TheMain.vue';

export default {
  name: 'App',
  components: { TheHeader, TheMain },
};
</script>

<template>
  <TheHeader />
  <TheMain />
</template>

<style lang="scss">
@use './colors.scss';

:root {
  background-color: colors.$background-0;
  color: colors.$foreground-0;
}

* {
  box-sizing: border-box;
}

a {
  font-weight: 500;
  color: colors.$foreground-0;
  text-decoration: inherit;
}

#app {
  width: 100%;
  margin: 0 auto;
  min-height: 2000px;
  text-align: center;
}

.underline {
  text-decoration: underline colors.$foreground-0;
}
</style>
