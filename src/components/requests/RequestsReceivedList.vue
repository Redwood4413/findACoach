<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'RequestsReceivedList',
  props: {
    requests: {
      type: Array as PropType<Request[]>,
      required: true,
    },
  },
};
</script>

<template>
  <ul class="request-list" v-if="requests.length > 0">
    <RequestsReceivedListItem
      v-for="request in requests"
      :key="request.requestId"
      :request="request" />
  </ul>
  <NotFound element="Requests" v-else />
</template>

<style lang="scss" scoped>
.request-list {
  margin: 0;
  padding: 0;
}
</style>
