<script lang="ts">
import { RouteRecordName, RouterView } from 'vue-router';
import { useReviewsStore } from '@/stores/ReviewsStore';
import BaseDialog from '../UI/BaseDialog.vue';

export default {
  name: 'CoachWrapper',
  components: { BaseDialog, RouterView },
  methods: {
    checkIfAbsolutePath(name: RouteRecordName | null | undefined) {
      if (name === 'details') {
        this.absolutePath = true;
      } else {
        this.absolutePath = false;
      }
    },
  },
  data: () => ({
    absolutePath: true,
  }),
  computed: {
    icon() {
      return this.absolutePath ? 'close' : 'return';
    },
  },
  mounted() {
    this.checkIfAbsolutePath(this.$route.name);
  },
  beforeRouteUpdate(to) {
    this.checkIfAbsolutePath(to.name);
  },
  beforeRouteEnter: (to, _, next) => {
    const reviewsStore = useReviewsStore();
    reviewsStore.fetchReviews(to.params.id as string);

    next();
  },
};
</script>

<template>
  <BaseDialog :iconType="icon" :returnTo="{ name: 'coaches' }">
    <RouterView />
  </BaseDialog>
</template>
