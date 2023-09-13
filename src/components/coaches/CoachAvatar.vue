<script lang="ts">
export default {
  name: 'CoachAvatar',
};
</script>

<template>
  <div class="avatar">
    <ri:user-3-line />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  background: $aqua;
  padding: 20px;
  height: 80px;
  width: 80px;
  // align-self: center;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  svg {
    height: 80px;
    color: $background-0;
  }
  &.big {
    width: 130px;
    height: 130px;
  }
  &.small {
    width: 50px;
    padding: 10px;
    height: 50px;
  }
}
</style>
