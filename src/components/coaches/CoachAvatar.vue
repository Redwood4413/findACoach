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
@use '@/colors.scss';
  .avatar{
    display:flex;
    background: colors.$aqua;
    padding:20px;
    height:80px;
    width:80px;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    svg {
      height:80px;
    }
    &.big {
      width:130px;
      height:130px;
    }
  }
</style>
