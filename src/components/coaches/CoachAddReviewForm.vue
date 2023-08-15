<script lang="ts">

import { useCoachesStore } from '@/stores/CoachesStore';
import BaseSubmitButton from '../UI/BaseSubmitButton.vue';
import CoachAddReviewFormRate from './CoachAddReviewFormRate.vue';

export default {
  name: 'CoachAddReviewForm',
  emits: ['add-review'],
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },
  data: () => ({
    description: {
      data: '',
      isValid: true,
      maxLen: 600,
      errorMsg: '',
    },
    rate: {
      data: 0,
      isValid: true,
      max: 5,
      errorMsg: '',
    },
    formIsValid: true,
  }),
  methods: {
    submitData() {
      this.descriptionValidation();
      this.rateValidation();
      const { description, rate } = this;
      if (!description.isValid || !rate.isValid) {
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
      const payload = {
        description: description.data,
        rate: rate.data,
      };
      this.$emit('add-review', payload);
    },
    changeRate(rate: number) {
      this.rate.data = rate;
    },
    descriptionValidation() {
      if (this.description.data.length > this.description.maxLen) {
        this.description.isValid = false;
        this.description.errorMsg = 'Your description is too long!';
        return;
      }
      if (this.description.data.length === 0) {
        this.description.isValid = false;
        this.description.errorMsg = 'Your description is too short!';
        return;
      }
      this.description.isValid = true;
    },
    rateValidation() {
      if (this.rate.data === 0) {
        this.rate.isValid = false;
        this.rate.errorMsg = 'You must set rate before continuing!';
      } else {
        this.rate.isValid = true;
      }
    },
  },

  watch: {
    'description.data': function valid() {
      this.descriptionValidation();
    },
    'rate.data': function valid() {
      this.rateValidation();
    },
  },
  computed: {},
  components: {
    BaseSubmitButton, CoachAddReviewFormRate,
  },
};
</script>

<template>
  <form
    class="form"
    @submit.prevent="submitData"
    novalidate
  >
    <span class="section-title">description:</span>
    <div class="input-wrapper">
      <textarea
        id="description"
        v-model="description.data"
        rows="3"
        required
      />
      <label type="text" for="description">Description<sup>*</sup></label>
      <div class="validation">
        <span class="invalid" v-if="!description.isValid">{{ description.errorMsg }}</span>
        <span class="counter">{{ description.data.length }}/{{ description.maxLen }}</span>
      </div>
    </div>
    <div class="input-wrapper">
      <CoachAddReviewFormRate
        :rate="rate.data"
        :max="rate.max"
        @change="changeRate"
      />
      <div class="validation">
        <span class="invalid" v-if="!rate.isValid">{{ rate.errorMsg }}</span>
      </div>
    </div>

    <div class="buttons">
      <BaseSubmitButton
        :isValid="formIsValid"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';

.form {
  display:flex;
  flex-direction: column;
  gap:1.5em;
  justify-content: center;
  text-align:left;
  .input-wrapper {
    display:flex;
    flex-direction: column;
    position:relative;
    textarea {
      background: none;
      border: 0;
      border-bottom: 2px solid colors.$foreground-2;
      &:focus-within, &:valid {
        outline:none;
        & + label {
          top:-2em;
          font-size: small;
        }
      }
      &:focus-within {
        background: colors.$background-4;
      }
    }
    label {
      top:0;
      transition-property: top, font-size;
      transition-duration: .2s;
      transition-timing-function: ease-in-out;
      pointer-events: none;
      user-select: none;
      position:absolute;
      color: colors.$foreground-2;
      font-weight: 400;
      sup {
        color:colors.$red;
        font-weight: 800;
      }
    }
    label, textarea {
      padding:0.3em;
      font-weight: 400;
    }
    textarea {
      resize:vertical;
      min-height:100px;
    }
    .validation {
      display:flex;
      font-size: small;
      height: 1rem;
      .invalid {
        color: colors.$red;
        font-weight: 800;
      }
      .counter {
        font-weight: 300;
        margin-left:auto;
      }
    }
  }
  .buttons {
    display:flex;
    justify-content: flex-end;
  }
}
</style>
