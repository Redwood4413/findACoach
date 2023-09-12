<script lang="ts">
import { useRequestsStore } from '@/stores/RequestsStore';
import { useAuthStore } from '@/stores/AuthStore';
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
  async beforeRouteEnter(_, __, next) {
    const requestsStore = useRequestsStore();
    const authStore = useAuthStore();

    if (!authStore.isCoach) {
      next({ name: 'no-permissions' });
      return;
    }

    await requestsStore.fetchRequests(authStore.userId);
    next();
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
