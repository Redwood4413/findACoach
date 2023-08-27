<script lang="ts">
import { RouteRecordName, RouterView } from 'vue-router';
import BaseDialog from '../UI/BaseDialog.vue';

export default {
  name: 'CoachWrapper',
  components: { BaseDialog, RouterView },
  mounted() {
    this.checkIfAbsolutePath(this.$route.name);
  },
  beforeRouteUpdate(to) {
    this.checkIfAbsolutePath(to.name);
  },
  methods: {
    checkIfAbsolutePath(name: RouteRecordName | null | undefined) {
      if (name === 'details') {
        this.absolutePath = true;
      } else {
        this.absolutePath = false;
      }
    },
  },
  data: () => ({
    absolutePath: true,
  }),
  computed: {
    icon() {
      return this.absolutePath ? 'close' : 'return';
    },
  },
};
</script>

<template>
  <BaseDialog :iconType="icon" :returnTo="{ name: 'coaches' }">
    <RouterView />
  </BaseDialog>
</template>
