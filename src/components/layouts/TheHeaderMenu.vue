<script lang="ts">
import TheHeaderLinks from './TheHeaderLinks.vue';
import BaseDropdownMenu from '../UI/BaseDropdownMenu.vue';

export default {
  name: 'TheHeaderMenu',
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isExpanded() {
      return this.expanded ? 'expanded' : '';
    },
  },
  components: { TheHeaderLinks, BaseDropdownMenu },
};
</script>

<template>
  <BaseDropdownMenu :expanded="expanded">
    <TheHeaderLinks :expanded="expanded" />
  </BaseDropdownMenu>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
</style>
