<script lang="ts">
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
};
</script>

<template>
  <BaseDropdownMenu :expanded="expanded">
    <TheHeaderLinks :expanded="expanded" />
  </BaseDropdownMenu>
</template>
