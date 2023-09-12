<script lang="ts">
import { useAuthStore } from './stores/AuthStore';
import { useCoachesStore } from './stores/CoachesStore';
import { useRequestsStore } from './stores/RequestsStore';
import { useReviewsStore } from './stores/ReviewsStore';

export default {
  name: 'App',
  setup() {
    const reviewsStore = useReviewsStore();
    const coachesStore = useCoachesStore();
    const requestsStore = useRequestsStore();
    const authStore = useAuthStore();

    return {
      reviewsStore,
      coachesStore,
      requestsStore,
      authStore,
    };
  },
  async mounted() {
    await this.authStore.fetchUser('heheszki');
  },
};
</script>

<template>
  <Transition mode="out-in" name="component-state">
    <AppLoading
      v-if="authStore.stateMachine.matches('loading')"></AppLoading>
    <div
      class="app-wrapper"
      v-else-if="authStore.stateMachine.matches('loaded')">
      <TheHeader />
      <TheMain />
    </div>
  </Transition>
</template>

<style lang="scss">
.component-state-enter-active,
.component-state-leave-active {
  transition: opacity 0.1s ease;
}

.component-state-enter-from,
.component-state-leave-to {
  opacity: 0;
}
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
.header-greetings {
  background: -webkit-linear-gradient(45deg, $orange, $strong-orange);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
* {
  box-sizing: border-box;
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
