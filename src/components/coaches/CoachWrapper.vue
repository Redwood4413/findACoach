<script lang="ts">

import { RouterView } from 'vue-router';
import BaseDialog from '../UI/BaseDialog.vue';

export default {
  name: 'CoachWrapper',
  components: { BaseDialog, RouterView },
};
</script>

<template>
  <BaseDialog :returnTo="{ name: 'coaches' }">
    <RouterView />
  </BaseDialog>
</template>
