<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import CoachAvatar from './CoachAvatar.vue';
import NotFound from '../NotFound.vue';
import BaseRouterLink from '../UI/BaseRouterLink.vue';
import CoachRate from './CoachRate.vue';
import CoachAreasList from './CoachAreasList.vue';

export default {
  name: 'CoachDetails',
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },
  components: {
    CoachAvatar,
    NotFound,
    BaseRouterLink,
    CoachRate,
    CoachAreasList,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    hideDialog() {
      this.$router.push({ name: 'home' });
    },
  },
  computed: {
    selectedCoach() {
      const coach = this.coachesStore.getCoach(this.id);
      if (!coach) return null;
      return coach;
    },
  },
};
</script>

<template>
  <div class="coach-details" v-if="selectedCoach">
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
      <span class="description">
        {{ selectedCoach.description }}
        If you are intersted, then fell free to <BaseRouterLink :to="{ name: 'contact' }" mode="flat">contact me.</BaseRouterLink>
      </span>
      <CoachAreasList :areas="selectedCoach.areas" />
      <div class="footer">
        <div class="wrapper">
          <span class="section-title">rate:</span>
          <CoachRate :id="id" />
        </div>
        <div class="wrapper">
          <span class="section-title">controls:</span>
          <div class="controls">
            <BaseRouterLink mode="rounded" :to="{ name: 'review' }">Reviews</BaseRouterLink>
            <BaseRouterLink mode="rounded" :to="{ name: 'review' }">Make a review</BaseRouterLink>
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
  .coach-details {
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
