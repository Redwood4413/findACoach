<script lang="ts">
import CoachRegistrationForm from './CoachRegistrationForm.vue';

export default {
  name: 'CoachRegistration',
  components: { CoachRegistrationForm },
};
</script>

<template>
  <BaseWrapper>
    <div class="header-wrapper">
      <h2>Become a Coach</h2>
      <h3>Register and help others thrive in the IT Industry!</h3>
    </div>
    <CoachRegistrationForm />
  </BaseWrapper>
</template>

<style lang="scss" scoped>
  @use '@/colors.scss';
  .header-wrapper {
    text-align: left;
    margin:0 0 1em 0;
    h3 {
      font-family: 'Open Sans';
      font-weight: 400;
      font-style: italic;
      color: colors.$foreground-1;
    }
  }
</style>
