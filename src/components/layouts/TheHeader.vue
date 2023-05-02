<script lang="ts">
import BaseButton from '../UI/BaseButton.vue';
import TheHeaderSidebar from './TheHeaderSidebar.vue';
import HamburgerIcon from '../icons/HamburgerIcon.vue'

export default {
    name: "TheHeader",
    data: () => ({
        small: false as boolean,
        isVisible: true as boolean,
    }),
    methods: {
        handleScroll(event: any) {
            if (event.currentTarget.scrollY > 50) {
                if (!this.small) {
                    this.small = true;
                }
            }
            else {
                if (this.small) {
                    this.small = false;
                }
            }
        },
        handleResize(event: any) {
          if (window.innerWidth <= 500) {
            this.isVisible = false;
          } else {
            this.isVisible = true;
          }
        }
    },
    computed: {
        isSmall(): string {
            return this.small ? "small" : "";
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleResize);
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    components: { BaseButton, TheHeaderSidebar, HamburgerIcon }
};
</script>

<template>
  <header :class="`header ${isSmall}`">
    <RouterLink :to="{ name: 'home' }">
      <h2>Find a Coach</h2>
    </RouterLink>
    <div class="buttons" v-if="isVisible">
      <RouterLink :to="{ name: 'coaches' }">Coaches</RouterLink>
      <RouterLink :to="{ name: 'requests' }">Requests</RouterLink>
      <RouterLink :to="{ name: 'register' }">Register</RouterLink>
    </div>
    <BaseButton mode="flat" v-else>
      <HamburgerIcon></HamburgerIcon>
    </BaseButton>
  </header>
  <TheSidebar v-if="!isVisible"></TheSidebar>
</template>

<style lang="scss" scoped>
  .header {
    width:100%;
    display:flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 2px solid white;
    background: rgb(255,255,255, 0.2);
    backdrop-filter: blur(3px);
    transition: all .3s ease-in-out;
    &.small {
      font-size: small;
      padding:0 1rem;
    }
      .buttons {
      display:flex;
      height:100%;
      a {
        padding:0.8rem;
        transition: background .1s ease-in-out;
        &:hover:not(.router-link-exact-active) {
          background: rgb(0,0,0, 0.3);
        }
      }
    }
  }

  .router-link-exact-active {
    background: rgb(32, 114, 54);
    border-bottom: 2px solid rgb(51, 161, 80);
  }

  @media (width < 500px) {
    .buttons {
      
    }
  }
</style>
