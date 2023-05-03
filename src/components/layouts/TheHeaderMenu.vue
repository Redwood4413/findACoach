<script lang="ts">
import TheHeaderLinks from './TheHeaderLinks.vue';

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
  components: { TheHeaderLinks },
};
</script>

<template>
  <Transition>
    <div :class="`menu ${isExpanded}`">
      <TheHeaderLinks :expanded="expanded" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

  .menu {
    position: absolute;
    font-size: medium;
    width:90vw;
    display:grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows .3s ease-in-out;
    top:100%;
    left:50%;
    transform: translate(-50%, 10%);
    border:2px solid colors.$gray;
    border-radius: 10px;
    padding:1rem;
    background: colors.$background-1;
    &.expanded {
      grid-template-rows: 1fr;
    }
  }

</style>
