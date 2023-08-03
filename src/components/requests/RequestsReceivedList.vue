<script lang="ts">

import { useRequestsStore } from '@/stores/RequestsStore';
import RequestsReceivedListItem from './RequestsReceivedListItem.vue';

import NotFound from '../NotFound.vue';

export default {
  name: 'RequestsReceivedList',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const requestsStore = useRequestsStore();
    return { requestsStore };
  },
  computed: {
    requests() {
      return this.requestsStore.getRequestsByCoach(this.id);
    },
  },
  components: { RequestsReceivedListItem, NotFound },
};
</script>

<template>
  <ul class="request-list" v-if="requests.length > 0">
    <RequestsReceivedListItem
      v-for="request in requests"
      :key="request.id"
      :request="request"
    />
  </ul>
  <NotFound element="Requests" v-else />
</template>

<style lang="scss" scoped>
  .request-list {
    margin:0;
    padding:0;
  }
</style>
