<script lang="ts">

export default {
  name: 'CoachAreasItem',
  props: {
    area: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <li class="badge">
    {{ area }}
  </li>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.badge {
  display:flex;
  background: colors.$strong-blue;
  padding:0 0.5rem;
  border-radius: 5rem;
  text-transform: capitalize;
  font-style: oblique;
  font-size: smaller;
}
</style>
