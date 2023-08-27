<script lang="ts">
import supabase from '@/lib/supabaseClient';
import CoachRegistrationForm from './CoachRegistrationForm.vue';

export default {
  name: 'CoachRegistration',
  components: { CoachRegistrationForm },
  methods: {
    async registerCoach(coach: Coach) {
      try {
        const { error } = await supabase.from('coaches').insert(coach);

        if (error) {
          throw new Error(`Failed! ${error.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <BaseWrapper>
    <div class="header-wrapper">
      <h2>Become a Coach</h2>
      <h3>Register and help others thrive in the IT Industry!</h3>
    </div>
  </BaseWrapper>
  <BaseWrapper>
    <CoachRegistrationForm @submit="registerCoach" />
  </BaseWrapper>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.header-wrapper {
  text-align: left;
  margin: 0 0 1em 0;
  h3 {
    font-family: 'Open Sans';
    font-weight: 400;
    font-style: italic;
    color: colors.$foreground-1;
  }
}
</style>
