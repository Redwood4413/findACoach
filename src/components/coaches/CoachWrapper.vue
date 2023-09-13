<script lang="ts">
import { RouteRecordName } from 'vue-router';
import { useReviewsStore } from '@/stores/ReviewsStore';

export default {
  name: 'CoachWrapper',
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
