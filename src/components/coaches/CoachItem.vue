<script lang="ts">
import CoachAreasList from './CoachAreasList.vue';
import CoachAvatar from './CoachAvatar.vue';

export default {
  name: 'CoachItem',
  components: {
    CoachAvatar,
    CoachAreasList,
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
        <BaseRouterLink :to="{ name: 'details', params: { id: coach.id } }" mode="rounded" color="orange">View Details</BaseRouterLink>
        <BaseRouterLink
          mode="rounded"
          :to="{ name: 'contact', params: { id: coach.id } }">Contact</BaseRouterLink>
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
        font-weight: 400;
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
