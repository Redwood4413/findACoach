<script lang="ts">
import BaseRouterLink from '../UI/BaseRouterLink.vue';
import AvatarIcon from '../icons/AvatarIcon.vue';
import BadgeItem from './BadgeItem.vue';
import CoachAvatar from './CoachAvatar.vue';

export default {
  name: 'CoachItem',
  components: {
    AvatarIcon,
    BadgeItem,
    BaseRouterLink,
    CoachAvatar,
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
      <ul class="areas-list">
        <span class="section-title">areas:</span>
        <div class="list-wrapper">
          <BadgeItem
            v-for="area in coach.areas"
            :key="area.id"
            :area="area"
          />
        </div>
      </ul>
    </div>
    <div class="controls">
      <span class="section-title">controls:</span>
      <div class="controls-wrapper">
        <BaseRouterLink mode="rounded" color="orange" :path="`/coaches/${coach.id}`">View Details</BaseRouterLink>
        <BaseRouterLink mode="rounded" :path="`/coaches/${coach.id}/contact`">Contact</BaseRouterLink>
      </div>
    </div>
  </li>

</template>

<style lang="scss" scoped>
@use '@/colors.scss';
  .coach-item {
    display:flex;
    gap:20px;
    padding:10px;
    flex-direction: column;
    border-bottom: colors.$strong-gray 1px solid;
    text-align: left;
    .section-title {
      color: colors.$foreground-4;
      padding:0.5rem 0;
      font-size: x-small;
      text-transform: uppercase;
    }
    .header {
      display:flex;
      width:100%;
      align-items: center;
      justify-content: center;
      position:relative;
      h3 {
        margin:0.5rem;
        flex:1;
        text-align: center;
      }
      .rate {
        font-size: smaller;
      }
    }

    .details {
      display:flex;
      gap:20px;

      .description {
        display:flex;
        flex-direction: column;
      }
      .areas-list {
        display:flex;
        flex-direction: column;
        min-width:200px;
        padding:0;
        .list-wrapper {
          display:flex;
          place-items: center;
          flex-wrap: wrap;
          gap:5px;
          padding:5px 0;
        }
      }
    }
    .controls {
      display:flex;
      flex-direction: column;
      .controls-wrapper {
        display:flex;
        flex-wrap: wrap;
        gap: 5px;
      }
    }
  }

  @media (width <= 650px) {
    .coach-item {
      .details {
        flex-direction: column;
      }
    }
  }
</style>
