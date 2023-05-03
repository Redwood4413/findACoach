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
    <RouterLink :to="{ name: 'coaches' }">Coaches</RouterLink>
    <RouterLink :to="{ name: 'requests' }">Requests</RouterLink>
    <RouterLink :to="{ name: 'register' }">Register</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.buttons {
  display:flex;
  height:100%;
  align-items: center;
  gap:10px;
  &.expanded {
    flex-direction: column;
  }
  a {
    padding:0.5rem 0.8rem;
    border-radius: 20px;
    max-width:200px;
    transition: background .1s ease-in-out;
    &:hover:not(.router-link-exact-active) {
      background: colors.$background-4;
    }
    &.router-link-exact-active {
      background: colors.$blue;
    }
  }
}
</style>
