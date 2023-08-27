<script lang="ts">
import TheHeader from './components/layouts/TheHeader.vue';
import TheMain from './components/layouts/TheMain.vue';
import { useCoachesStore } from './stores/CoachesStore';
import { useRequestsStore } from './stores/RequestsStore';
import { useReviewsStore } from './stores/ReviewsStore';

export default {
  name: 'App',
  components: { TheHeader, TheMain },
  setup() {
    const reviewsStore = useReviewsStore();
    const coachesStore = useCoachesStore();
    const requestsStore = useRequestsStore();
    return { reviewsStore, coachesStore, requestsStore };
  },
};
</script>

<template>
  <TheHeader />
  <TheMain />
</template>

<style lang="scss">
:root {
  background-color: $background-0;
  color: $foreground-0;
}
::-moz-selection {
  /* Code for Firefox */
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
    margin: 0 $scrollbar-width 0 0;
  }
}
.section-title {
  color: $foreground-4;
  padding: 0.5rem 0;
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
  width: $scrollbar-width;
  height: $scrollbar-width;
}

*::-webkit-scrollbar-track {
  background: $background-soft;
}

*::-webkit-scrollbar-thumb {
  background-color: $yellow;
  border-radius: 20px;
  border: 0px solid #ffffff;
}

a {
  font-weight: 500;
  color: $foreground-0;
  text-decoration: inherit;
}

input,
textarea,
button,
select {
  font: inherit;
  color: inherit;
}

img,
svg,
video,
picture {
  max-width: 100%;
  display: block;
}
#app {
  width: 100%;
  margin: 0 auto;
  min-height: 2000px;
  text-align: center;
}

.underline {
  text-decoration: underline $foreground-0;
}
</style>
