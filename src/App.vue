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
@use '@/colors.scss';
@use '@/variables.scss';

:root {
  background-color: colors.$background-0;
  color: colors.$foreground-0;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  &.hiden-overflow {
    overflow: hidden;
    margin: 0 variables.$scrollbar-width 0 0;
  }
}

* {
  box-sizing: border-box;
  scrollbar-width: auto;
  scrollbar-color: red #ffffff;
}

*::-webkit-scrollbar {
  width: variables.$scrollbar-width;
}

*::-webkit-scrollbar-track {
  background: colors.$background-soft;
}

*::-webkit-scrollbar-thumb {
  background-color: colors.$yellow;
  border-radius: 20px;
  border: 0px solid #ffffff;
}

a {
  font-weight: 500;
  color: colors.$foreground-0;
  text-decoration: inherit;
}

img, svg, video {
  max-width: 100%;
  display:block;
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
