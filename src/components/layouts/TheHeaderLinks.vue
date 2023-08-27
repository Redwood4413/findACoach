<script lang="ts">
export default {
  name: 'TheHeaderLinks',
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
    <BaseRouterLink :to="{ name: 'requests' }">Requests</BaseRouterLink>
    <BaseRouterLink :to="{ name: 'register-coach' }"
      >Become a coach</BaseRouterLink
    >
  </div>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
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
      background: colors.$background-4;
    }
    &.router-link-active {
      background: colors.$blue;
    }
  }
}
</style>
