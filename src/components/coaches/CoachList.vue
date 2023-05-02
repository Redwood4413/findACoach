<script lang="ts">
import BaseButton from '../UI/BaseButton.vue';

export default {
    name: "CoachList",
    components: { BaseButton }
};
</script>

<template>
  <div class="controls">
    <BaseButton title="Refresh"></BaseButton>
    <RouterLink :to="{ name: 'register' }"></RouterLink>
  </div>
</template>
