<script lang="ts">
import { mapGetters } from 'vuex';
import BaseButton from '../UI/BaseButton.vue';
import BaseDialog from '../UI/BaseDialog.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import CoachAvatar from './CoachAvatar.vue';

export default {
  name: 'CoachDetails',
  components: {
    BaseDialog,
    BaseButton,
    CloseIcon,
    CoachAvatar,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    hideDialog() {
      this.$router.push({ name: this.returnTo });
    },
  },
  computed: {
    returnTo(): string {
      return 'home';
    },
    ...mapGetters('coaches', ['coach']),
    selectedCoach() {
      return this.coach(this.id);
    },
  },
};
</script>

<template>
  <BaseDialog :returnTo="returnTo">
    <div class="header">
      <div class="nav">
        <BaseButton mode="flat rounded-corners" @click="hideDialog" title="Close">
          <CloseIcon />
        </BaseButton>
      </div>
      <div class="coach-header">
        <CoachAvatar />
        <h2>
          <span>{{selectedCoach.firstName}}</span>
          <span>{{selectedCoach.lastName}}</span>
        </h2>
      </div>
    </div>
    <div class="coach-details">
      <span class="section-title">description:</span>
      <span class="description">{{ selectedCoach.description }}
        If you are intersted, then <BaseButton routeName="contact" mode="flat">contact me.</BaseButton>
      </span>
      <div class="controls">
        <span class="section-title">controls:</span>
        <div class="controls-wrapper">
          <BaseButton mode="rounded" routeName="contact">Contact</BaseButton>
          <BaseButton mode="rounded" routeName="contact">Contact</BaseButton>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
  .header {
    display:flex;
    align-items: center;
    flex-direction: column;
    height:250px;
    background: url(@/assets/coach-backgrounds/swirlbox.jpg), colors.$background-soft;
    background-size: cover;
    background-position: center;
    transition: background .3s ease-in-out;
    border-bottom: 2px solid colors.$gray;
    &:hover {
      .nav {
        background: linear-gradient(180deg, colors.$background-0 0%, rgba(41,7,10,0) 100%);
      }
    }
    .nav {
      display:flex;
      justify-content: flex-end;
      width: 100%;
      position: absolute;
      padding:0.5rem;
    }
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
  .coach-details {
    display:flex;
    flex-direction: column;
    padding:1rem;
    .section-title {
      color: colors.$strong-gray;
      padding:0.5rem 0;
      font-size: x-small;
      text-transform: uppercase;
    }
    .controls {
      display:flex;
      flex-direction: column;
    }
  }
</style>
