<script lang="ts">
import BaseButton from '../UI/BaseButton.vue';

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
  components: { BaseButton },
};
</script>

<template>
  <div :class="`buttons ${expandedClass}`">
    <BaseButton routeName="coaches">Coaches</BaseButton>
    <BaseButton routeName="requests">Requests</BaseButton>
    <BaseButton routeName="register">Register</BaseButton>
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
    &.router-link-active {
      background: colors.$blue;
    }
  }
}
</style>
