<script lang="ts">
import TheHeader from './components/layouts/TheHeader.vue';
import TheMain from './components/layouts/TheMain.vue';
import { useCoachesStore } from './stores/CoachesStore';
import { useRequestsStore } from './stores/RequestsStore';

export default {
  name: 'App',
  setup() {
    const coachesStore = useCoachesStore();
    const requestsStore = useRequestsStore();

    return { coachesStore, requestsStore };
  },
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
::-moz-selection { /* Code for Firefox */
  background: rgb(77, 152, 196);
}

::selection {
  background: rgb(77, 152, 196);
}
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  &.hidden-overflow {
    overflow: hidden;
    margin: 0 variables.$scrollbar-width 0 0;
  }
}
.section-title {
  color: colors.$foreground-4;
  padding:0.5rem 0;
  font-size: x-small;
  font-weight: 600;
  text-transform: uppercase;
}
* {
  box-sizing: border-box;
  scrollbar-width: auto;
  scrollbar-color: red #ffffff;
}

*::-webkit-scrollbar {
  width: variables.$scrollbar-width;
  height: variables.$scrollbar-width;

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

input, textarea, button, select {
  font: inherit;
  color: inherit;
}

img, svg, video, picture {
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
./stores/CoachesStore
