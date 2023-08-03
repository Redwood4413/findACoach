<script lang="ts">

import { useRequestsStore } from '@/stores/RequestsStore';
import RequestsReceivedList from './RequestsReceivedList.vue';

export default {
  name: 'RequestsReceived',
  components: { RequestsReceivedList },
  setup() {
    const RequestsStore = useRequestsStore();
    return { RequestsStore };
  },
  data: () => ({
    coachId: 'c3',
  }),
};
</script>

<template>
  <BaseWrapper>
    <h2>Your received requests:</h2>
    <RequestsReceivedList :id="coachId" />
  </BaseWrapper>
</template>

<style lang="scss" scoped>
  h2 {
    text-align: left;
  }
</style>
