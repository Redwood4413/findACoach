<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import { useReviewsStore } from '@/stores/ReviewsStore';

import CoachAvatar from './CoachAvatar.vue';
import NotFound from '../NotFound.vue';
import BaseRouterLink from '../UI/BaseRouterLink.vue';
import CoachRate from './CoachRate.vue';
import CoachAreasList from './CoachAreasList.vue';
import CoachRateLoading from './CoachRateLoading.vue';
import CoachDetailsLoading from './CoachDetailsLoading.vue';

export default {
  name: 'CoachDetails',
  setup() {
    const coachesStore = useCoachesStore();
    const reviewsStore = useReviewsStore();
    return { coachesStore, reviewsStore };
  },
  components: {
    CoachAvatar,
    NotFound,
    BaseRouterLink,
    CoachRate,
    CoachAreasList,
    CoachRateLoading,
    CoachDetailsLoading,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    selectedCoach() {
      const coach = this.coachesStore.getCoach(this.id);
      if (!coach) return null;
      return coach;
    },
    reviewsQuantity() {
      return this.reviewsStore.getReviews.length;
    },
  },
};
</script>

<template>
  <CoachDetailsLoading v-if="coachesStore.stateMachine.matches('loading')" />
  <div class="coach-details" v-else-if="selectedCoach">
    <div class="header">
      <div class="coach-header">
        <CoachAvatar />
        <h2>
          <span>{{selectedCoach.firstName}}</span>
          <span>{{selectedCoach.lastName}}</span>
        </h2>
      </div>
    </div>
    <div class="info">
      <div class="info-header">
        <span class="section-title">description:</span>
        <span class="rate">

          ${{ selectedCoach.hourlyRate }} per hour
        </span>

      </div>
      <div class="description">
        {{ selectedCoach.description }}
        <p>If you are intersted, then fell free to <BaseRouterLink :to="{ name: 'contact' }" mode="flat">contact me.</BaseRouterLink>
        </p>
      </div>
      <CoachAreasList :areas="selectedCoach.areas" />
      <div class="footer">
        <div class="wrapper">
          <span class="section-title">rate:</span>
          <Transition mode="out-in">
            <CoachRate :id="id" v-if="reviewsStore.stateMachine.matches('loaded')" />
            <CoachRateLoading v-else />
          </Transition>
        </div>
        <div class="wrapper">
          <span class="section-title">controls:</span>
          <div class="controls">
            <BaseRouterLink
              mode="rounded"
              :to="{ name: 'reviews' }"
              v-if="reviewsQuantity > 0"
            >Reviews</BaseRouterLink>
            <BaseRouterLink mode="rounded" :to="{ name: 'add-review' }">Make a review</BaseRouterLink>
            <BaseRouterLink mode="rounded" color="orange" :to="{ name: 'contact' }">Contact</BaseRouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotFound element="Coach" v-else />
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.v-enter-active,
.v-leave-active {
  transition: opacity .2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
  .coach-details {
    width:100%;
    .header {
      display:flex;
      align-items: center;
      flex-direction: column;
      height:250px;
      background: url(@/assets/coach-backgrounds/swirlbox.jpg), colors.$background-soft;
      background-size: cover;
      animation: bgAnimation 30s infinite alternate ease-out;
      border-bottom: 2px solid colors.$gray;
      .coach-header {
        display:flex;
        justify-content: center;
        align-items: center;
        gap:20px;
        height:100%;
        width:100%;
        h2 {
          display:flex;
          flex-direction: column;
        }
      }
    }
    .info {
      display:flex;
      flex-direction: column;
      padding:1rem;
      .info-header {
        display:flex;
        justify-content: space-between;
        align-items: center;
        .rate {
          font-size: smaller;
        }
      }
      .description {
        font-weight: 400;
        p, p > a {
          font-weight: 200;
          font-size: small;
        }
      }
      .footer {
        display:flex;
        justify-content: space-between;
        .wrapper {
          display:flex;
          flex-direction: column;
          justify-content: flex-end;
          &:last-child {
            text-align: end;
          }
          .controls {
            display:flex;
            gap: 5px;
            flex-wrap: wrap;
          }
          .controls {
            justify-content: flex-end;
          }
        }
      }
    }
  }
  @keyframes bgAnimation {
    from {
    background-position: top left;
    }
    to {
    background-position: bottom right;
    }
  }
</style>
