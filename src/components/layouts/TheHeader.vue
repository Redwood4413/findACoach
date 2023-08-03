<script lang="ts">
import BaseButton from '../UI/BaseButton.vue';
import TheHeaderMenu from './TheHeaderMenu.vue';
import HamburgerIcon from '../icons/HamburgerIcon.vue';
import TheHeaderLinks from './TheHeaderLinks.vue';

import BaseDropdownMenu from '../UI/BaseDropdownMenu.vue';

export default {
  name: 'TheHeader',
  components: {
    BaseButton,
    TheHeaderMenu,
    HamburgerIcon,
    TheHeaderLinks,
    BaseDropdownMenu,
  },
  data: () => ({
    screen: {
      width: window.innerWidth as number,
      scrollY: window.scrollY as number,
    },
    isExpanded: false as boolean,
  }),
  computed: {
    small() {
      return this.screen.scrollY >= 100 ? 'small' : '';
    },
  },
  methods: {
    handleScroll(event) {
      this.screen.scrollY = event.currentTarget.scrollY;
    },
    handleResize() {
      this.screen.width = window.innerWidth;
    },
    expandMenu() {
      this.isExpanded = !this.isExpanded;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    $route() {
      this.isExpanded = false;
    },
  },
};
</script>

<template>
  <header :class="`header ${small}`">
    <RouterLink :to="{ name: 'home' }">
      <h2>Find a Coach</h2>
    </RouterLink>
    <TheHeaderLinks
      :expanded="false"
      v-if="screen.width > 500"
    />
    <BaseButton
      mode="flat"
      v-if="screen.width <= 500"
      @click="expandMenu"
    >
      <HamburgerIcon />
    </BaseButton>
    <Transition>
      <BaseDropdownMenu
        v-if="isExpanded && screen.width <= 500"
      >
        <div class="links-wrapper">
          <TheHeaderLinks :expanded="isExpanded" />
        </div>
      </BaseDropdownMenu>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
@import '@/variables.scss';

  .header {
    width:100%;
    display:flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 2px solid colors.$gray;
    background: colors.$background-1;
    backdrop-filter: blur(3px);
    transition: all .3s ease-in-out;
    z-index: map-get($header-map, zIndex);
    &.small {
      font-size: small;
      padding:0 1rem;
    }
    h2 {
      white-space: nowrap;
    }
  }
  .v-enter-active, .v-leave-active {
  transition: opacity .3s ease;
}
.links-wrapper {
  padding:1em;
}
.v-enter-to, .v-leave-from {
  opacity: 1;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
