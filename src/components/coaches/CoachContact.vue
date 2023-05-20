<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'CoachContact',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('coaches', ['getCoach']),
  },
  mounted() {

  },
};
</script>

<template>
  <BaseDialog returnTo="contact">
    <h2 />
  </BaseDialog>
</template>
