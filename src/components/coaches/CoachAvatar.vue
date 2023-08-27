<script lang="ts">
import AvatarIcon from '../icons/AvatarIcon.vue';

export default {
  name: 'CoachAvatar',
  components: { AvatarIcon },
};
</script>

<template>
  <div class="avatar">
    <AvatarIcon />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  background: $aqua;
  padding: 20px;
  height: 80px;
  width: 80px;
  align-self: center;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  svg {
    height: 80px;
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
