<script lang="ts">
import MaterialSymbolsDeleteForeverRounded from '@/components/icons/material-symbols/MaterialSymbolsDelete.vue';
import CoachRegistrationFormInputWithSuggests from './CoachRegistrationFormInputWithSuggests.vue';
import CoachRegistrationFormExpertiseBadge from './CoachRegistrationFormExpertiseBadge.vue';
import BaseSubmitButton from '../UI/BaseSubmitButton.vue';

import BaseButton from '../UI/BaseButton.vue';

export default {
  name: 'CoachRegistrationForm',
  data: () => ({
    firstName: {
      data: '',
      isValid: true,
      maxLen: 24,
    },
    lastName: {
      data: '',
      isValid: true,
      maxLen: 24,
    },
    description: {
      data: '',
      isValid: true,
      maxLen: 300,
    },
    expertise: {
      data: '',
      isValid: true,
      maxLen: 24,
    },
    expertises: {
      data: [] as string[],
      isValid: true,
      maxLen: 10,
    },
    formIsValid: false,
  }),
  methods: {
    submit() {
    },
    addExpertise(payload: string) {
      if (!payload) return;
      this.expertises.data.push(payload);
    },
    removeExpertise(index: number) {
      this.expertises.data.splice(index, 1);
    },
    firstNameValidation() {
      const { firstName } = this;

      if (firstName.data.length > firstName.maxLen) {
        this.firstName.isValid = false;
      } else {
        this.firstName.isValid = true;
      }
    },
    lastNameValidation() {
      const { lastName } = this;

      if (lastName.data.length > lastName.maxLen) {
        this.lastName.isValid = false;
      } else {
        this.lastName.isValid = true;
      }
    },
    descriptionValidation() {
      const { description } = this;

      if (description.data.length > description.maxLen) {
        this.description.isValid = false;
      } else {
        this.description.isValid = true;
      }
    },
    expertisesValidation() {
      const { expertises } = this;

      if (expertises.data.length > expertises.maxLen) {
        this.expertises.isValid = false;
      } else {
        this.expertises.isValid = true;
      }
    },
  },
  watch: {
    'firstName.data': function validity() {
      this.firstNameValidation();
    },
    'lastName.data': function valid() {
      this.lastNameValidation();
    },
    'description.data': function valid() {
      this.descriptionValidation();
    },
    'expertises.data.length': function valid() {
      this.expertisesValidation();
    },
  },
  components: {
    CoachRegistrationFormInputWithSuggests,
    BaseSubmitButton,
    CoachRegistrationFormExpertiseBadge,
    BaseButton,
    MaterialSymbolsDeleteForeverRounded,
  },
};
</script>

<template>
  <form @submit.prevent="submit" class="form" novalidate>
    <div class="basic">
      <div class="input-wrapper">
        <input
          type="text"
          id="first"
          v-model.trim="firstName.data"
          required>
        <label for="first">First name<sup>*</sup></label>
        <div class="validation">
          <span class="invalid" v-if="!firstName.isValid">Your first name is invalid!</span>
          <span class="counter">{{ firstName.data.length }} / {{ firstName.maxLen }}</span>
        </div>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          id="last"
          v-model.trim="lastName.data"
          required>
        <label for="last">Last name<sup>*</sup></label>
        <div class="validation">
          <span class="invalid" v-if="!lastName.isValid">Your last name is invalid!</span>
          <span class="counter">{{ lastName.data.length }} / {{ lastName.maxLen }}</span>
        </div>
      </div>
    </div>
    <div class="details">
      <div class="input-wrapper">
        <textarea
          id="description"
          type="text"
          rows="5"
          v-model.trim="description.data"
          required />
        <label for="description">Introduce yourself<sup>*</sup></label>
        <div class="validation">
          <span class="invalid" v-if="!description.isValid">Your message is invalid!</span>
          <span class="counter">{{ description.data.length }} / {{ description.maxLen }}</span>
        </div>
      </div>
    </div>

    <div class="expertises">
      <CoachRegistrationFormInputWithSuggests
        :existingItems="expertises.data"
        title="type your expertises"
        @set-expertise="addExpertise" />
      <div class="expertises-wrapper">
        <span class="section-title">your expertises:</span>
        <TransitionGroup
          tag="ul"
          class="expertise-list"
          name="expertise"
        >
          <template v-if="expertises.data.length > 0">
            <CoachRegistrationFormExpertiseBadge
              v-for="(expertise, index) in expertises.data"
              :key="expertise"
            >
              {{ expertise }}
              <BaseButton
                @click="removeExpertise(index)"
                class="flat icon"
                title="Delete"
              >
                <MaterialSymbolsDeleteForeverRounded />
              </BaseButton>
            </CoachRegistrationFormExpertiseBadge>
          </template>
          <span v-else class="empty">Empty</span>
        </TransitionGroup>
        <div class="validation">
          <span class="invalid" v-if="!expertises.isValid">Your expertises are invalid!</span>
          <span class="counter">{{ expertises.data.length }} / {{ expertises.maxLen }}</span>
        </div>
      </div>
    </div>
    <div class="buttons">
      <BaseSubmitButton :isValid="formIsValid">Register</BaseSubmitButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use '@/colors.scss';
.expertise-enter-from, .expertise-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.expertise-enter-active, .expertise-leave-active, .expertise-move {
  transition: all .3s ease-in-out;
}

.form {
  display:flex;
  flex-direction: column;
  gap:2em;
  justify-content: center;
  text-align:left;
  & > *, :deep(> *) {
    display:flex;
    gap:1em;
    justify-content: center;
    align-items: center;
    .input-wrapper, .expertises-wrapper {
      display:flex;
      flex-direction: column;
      position:relative;
      width:100%;

      input, textarea {
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
      input, label, textarea {
        padding:0.3em;
        font-weight: 400;
      }
      textarea {
        resize:vertical;
        min-height:100px;
      }

      .expertise-list {
        position:relative;
        display: flex;
        align-items: flex-start;
        padding:0;
        margin:0;
        gap:0.5em;
        min-height:100px;
        padding:0.5em;
        border: 2px solid colors.$foreground-4;
        border-radius: 1em;
        flex-wrap: wrap;
        .empty {
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%, -50%);
          font-weight: 200;
          user-select: none;
          color: colors.$foreground-4
        }
        svg {
          width:1.5em;
          height:1.5em;
        }
      }
      .validation {
        display:flex;
        font-size: small;
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
  }
  .expertises {
      align-items: flex-start;
    }

    .buttons {
      display:flex;
      justify-content: flex-end;
    }
  }
@media (width <= 500px) {
  .form {
    .expertises {
      flex-direction: column;
    }
  }
}
</style>
