<script lang="ts">
export default {
  name: 'CoachesListNothingFound',
};
</script>

<template>
  <div class="nothing-found">
    <h2>Nothing found.</h2>
    <span>Maybe try to change filter options?</span>
    <ThinkingEmoji />
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&display=swap');
.nothing-found {
  font-family: 'Cabin Sketch', cursive;
  display: flex;
  font-size: larger;
  flex-direction: column;
  align-items: center;
}
</style>
