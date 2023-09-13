<script lang="ts">
import { useReviewsStore } from '@/stores/ReviewsStore';
import { useAuthStore } from '@/stores/AuthStore';

export default {
  name: 'CoachListItem',
  setup() {
    const reviewsStore = useReviewsStore();
    const authStore = useAuthStore();
    return { reviewsStore, authStore };
  },
  props: {
    coach: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
  },
};
</script>

<template>
  <li class="coach-item">
    <div class="header">
      <h3>
        {{ fullName }}
      </h3>
      <span class="rate">${{ coach.hourlyRate }} / hour</span>
    </div>
    <div class="details">
      <CoachAvatar />
      <span class="description">
        <span class="section-title">description:</span>
        {{ coach.description }}
      </span>
      <CoachAreasList :areas="coach.areas" />
    </div>
    <div class="controls">
      <span class="section-title">controls:</span>
      <div class="controls-wrapper">
        <BaseRouterLink
          :to="{ name: 'details', params: { id: coach.userId } }"
          mode="rounded"
          color="orange"
          >View Details</BaseRouterLink
        >
        <BaseRouterLink
          mode="rounded"
          v-if="authStore.userId !== coach.userId"
          :to="{ name: 'contact', params: { id: coach.userId } }"
          >Contact</BaseRouterLink
        >
        <BaseRouterLink
          mode="rounded"
          v-else
          :to="{ name: 'edit-profile' }"
          >Edit Profile</BaseRouterLink
        >
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.coach-item {
  display: flex;
  gap: 1.5em;
  padding: 0.7em;
  flex-direction: column;
  border-bottom: $strong-gray 1px solid;
  text-align: left;
  .header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    h3 {
      margin: 0.5rem;
      flex: 1;
      text-align: center;
    }
    .rate {
      font-size: smaller;
    }
  }

  .details {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 2em;
    .description {
      display: flex;
      flex-direction: column;
      text-align: justify;
      font-weight: 400;
    }
  }
  .controls {
    display: flex;
    flex-direction: column;
    .controls-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
  }
}

@media (width <= 650px) {
  .coach-item {
    .details {
      grid-template-columns: 1fr;
    }
  }
}
</style>
