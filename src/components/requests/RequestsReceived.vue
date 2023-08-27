<script lang="ts">
import { useRequestsStore } from '@/stores/RequestsStore';
import RequestsReceivedList from './RequestsReceivedList.vue';

export default {
  name: 'RequestsReceived',
  components: { RequestsReceivedList },
  setup() {
    const requestsStore = useRequestsStore();
    return { requestsStore };
  },
  computed: {
    requests() {
      return this.requestsStore.getRequests;
    },
  },
};
</script>

<template>
  <BaseWrapper>
    <h2>Your received requests:</h2>
    <RequestsReceivedList :requests="requests" />
  </BaseWrapper>
</template>

<style lang="scss" scoped>
h2 {
  text-align: left;
}
</style>
