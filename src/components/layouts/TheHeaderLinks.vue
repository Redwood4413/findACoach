<script lang="ts">
import { useAuthStore } from '@/stores/AuthStore';

export default {
  name: 'TheHeaderLinks',
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    expandedClass(): string {
      return this.expanded ? 'expanded' : '';
    },
  },
};
</script>

<template>
  <div :class="`buttons ${expandedClass}`">
    <BaseRouterLink :to="{ name: 'coaches' }">Coaches</BaseRouterLink>
    <BaseRouterLink
      :to="{ name: 'requests' }"
      v-if="authStore.isCoach">
      Requests
    </BaseRouterLink>
    <BaseRouterLink :to="{ name: 'register-coach' }" v-else
      >Become a coach</BaseRouterLink
    >
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
  &.expanded {
    flex-direction: column;
  }
  a {
    padding: 0.5rem 0.8rem;
    border-radius: 20px;
    max-width: 200px;
    background: none;
    transition: background 0.1s ease-in-out;
    &:hover:not(.router-link-exact-active) {
      background: $background-4;
    }
    &.router-link-active {
      background: $blue;
    }
  }
}
</style>
