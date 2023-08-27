<script lang="ts">
export default {
  name: 'CoachRegistrationFormExpertiseBadge',
};
</script>

<template>
  <li class="badge">
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.badge {
  display: flex;
  gap: 0.3em;
  user-select: none;
  background: $strong-blue;
  padding: 0.3rem 0.5rem;
  border-radius: 5rem;
  text-transform: capitalize;
  font-size: smaller;
}
</style>
