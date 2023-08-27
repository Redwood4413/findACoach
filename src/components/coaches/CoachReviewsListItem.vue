<script lang="ts">
import { PropType } from 'vue';
import { useReviewsStore } from '@/stores/ReviewsStore';
import { useAuthStore } from '@/stores/AuthStore';
import CoachRatePoint from './CoachRatePoint.vue';
import UserAvatar from '../users/UserAvatar.vue';
import BaseRouterLink from '../UI/BaseRouterLink.vue';
import BaseButton from '../UI/BaseButton.vue';

export default {
  name: 'CoachReviewsItem',
  props: {
    review: {
      type: Object as PropType<Review>,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const reviewsStore = useReviewsStore();
    const authStore = useAuthStore();
    return { reviewsStore, authStore };
  },
  computed: {
    reviewRate() {
      return this.review.rate;
    },
    fullName(): string {
      return this.reviewsStore.getAuthorFullName(this.review.reviewId);
    },
    createdAt(): string {
      const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'short',
        timeStyle: 'short',
      };

      const formatter = new Intl.DateTimeFormat(undefined, options);
      return formatter.format(this.review.createdAt);
    },
  },
  components: {
    CoachRatePoint,
    UserAvatar,
    BaseRouterLink,
    BaseButton,
  },
};
</script>

<template>
  <li class="coach-review">
    <div class="header">
      <div class="user-wrapper">
        <UserAvatar class="small" />
        <div class="user-info">
          <span class="user-name">
            {{ fullName }}
          </span>
          <div class="quantity">Reviews: ({{ quantity }})</div>
        </div>
      </div>
      <div class="rate">
        <div class="section-title header">
          <span>Rate:</span>
          <span> {{ reviewRate }}/5</span>
        </div>
        <div class="rate-wrapper">
          <CoachRatePoint
            v-for="index in 5"
            :key="index"
            :rate="reviewRate"
            :index="index"
          />
        </div>
      </div>
    </div>
    <div class="description">
      <div class="section-title">description:</div>
      {{ review.description }}
    </div>

    <div class="bottom">
      <div class="controls" v-if="review.authorId === authStore.getUserId">
        <BaseRouterLink
          class="rounded"
          :to="{ name: 'edit-review', params: { reviewId: review.reviewId } }"
          >Edit</BaseRouterLink
        >
        <BaseButton
          @click="reviewsStore.deleteReview(review.reviewId)"
          class="rounded red"
          >Delete</BaseButton
        >
      </div>
      <div class="time-added">
        <div class="section-title">Added:</div>
        <span>{{ createdAt }}</span>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.coach-review {
  display: flex;
  flex: 1;
  word-break: break-all;
  flex-direction: column;
  padding: 1em 0;
  gap: 1em;
  border-bottom: $strong-gray 1px solid;
  .header {
    display: flex;
    .user-wrapper {
      display: flex;
      gap: 1em;
      .user-info {
        display: flex;
        justify-content: center;
        flex-direction: column;
        .user-name {
          font-weight: 400;
        }
        .quantity {
          font-size: x-small;
          color: $foreground-3;
        }
      }
    }
    .rate {
      display: flex;
      text-align: end;
      flex-direction: column;
      margin-left: auto;
      .header {
        display: flex;
        justify-content: space-between;
      }
      .rate-wrapper {
        display: flex;
        gap: 0.5em;
      }
    }
  }

  .description {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-weight: 300;
    font-size: 0.9em;
  }
  .bottom {
    display: flex;
    .controls {
      display: flex;
      gap: 0.5em;
      align-items: center;
    }
    .time-added {
      color: $foreground-2;
      font-size: smaller;
      margin-left: auto;
      font-style: italic;
      text-align: right;
      font-family: 'Open Sans';
    }
  }
}
// .controls {
//   display:flex;
//   flex-direction: column;
//   .controls-wrapper {
//     display:flex;
//     flex-wrap: wrap;
//     gap: 5px;
//   }
// }
</style>
