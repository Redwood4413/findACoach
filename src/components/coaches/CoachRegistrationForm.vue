<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import { useAuthStore } from '@/stores/AuthStore';
import CoachRegistrationFormVueSelect, {
  Expertises,
} from './CoachRegistrationFormVueSelect.vue';

export default {
  name: 'CoachRegistrationForm',
  emits: ['submit'],
  data: () => ({
    description: {
      data: '',
      isValid: true,
      errorMsg: '',
      maxLen: 300,
    },
    cost: {
      data: 1,
      isValid: true,
      errorMsg: '',
      max: 1000,
      min: 1,
    },
    expertises: {
      data: [] as string[],
      isValid: true,
    } as Expertises,
    formIsValid: false,
  }),
  setup() {
    const coachesStore = useCoachesStore();
    const authStore = useAuthStore();
    return { coachesStore, authStore };
  },
  computed: {
    uniqueAreas() {
      return this.coachesStore.getUniqueAreas;
    },
  },
  methods: {
    submit() {
      const {
        costValidation,
        descriptionValidation,
        cost,
        description,
        expertises,
      } = this;

      // eslint-disable-next-line prefer-destructuring
      const vueSelect = this.$refs.vueSelect as InstanceType<
        typeof CoachRegistrationFormVueSelect
      >;

      costValidation();
      descriptionValidation();
      vueSelect.expertisesValidation();

      if (
        !cost.isValid ||
        !description.isValid ||
        !expertises.isValid
      ) {
        this.formIsValid = false;
        return;
      }
      this.formIsValid = true;

      const coach: Coach = {
        userId: this.authStore.userId,
        hourlyRate: this.cost.data,
        description: this.description.data,
        areas: this.expertises.data,
      };

      this.$emit('submit', coach);
    },
    addExpertise({ data, isValid }: Expertises) {
      this.expertises.data = data;
      this.expertises.isValid = isValid;
    },
    descriptionValidation() {
      const { description } = this;

      if (description.data.length > description.maxLen) {
        this.description.errorMsg = 'Too long!';
        this.description.isValid = false;
        return;
      }
      if (description.data.length === 0) {
        this.description.errorMsg = 'Too short!';
        this.description.isValid = false;
        return;
      }
      this.description.isValid = true;
    },
    costValidation() {
      const { cost } = this;
      if (typeof cost.data !== 'number') {
        this.cost.isValid = false;
        this.cost.errorMsg = 'Your cost must be a number!';
        return;
      }

      if (cost.data > cost.max) {
        this.cost.data = cost.max;
      }
      if (cost.data < cost.min) {
        this.cost.data = cost.min;
      }
      this.cost.isValid = true;
    },
  },
  watch: {
    'description.data': function valid() {
      this.descriptionValidation();
    },
    'cost.data': function valid() {
      this.costValidation();
    },
  },
};
</script>

<template>
  <form @submit.prevent="submit" class="form" novalidate>
    <div class="input-wrapper">
      <textarea
        id="description"
        type="text"
        rows="5"
        v-model.trim="description.data"
        required />
      <label for="description">Introduce yourself<sup>*</sup></label>
      <div class="validation">
        <span class="invalid" v-if="!description.isValid">{{
          description.errorMsg
        }}</span>
        <span class="counter"
          >{{ description.data.length }} /
          {{ description.maxLen }}</span
        >
      </div>
    </div>
    <div class="input-wrapper">
      <input
        type="number"
        id="cost"
        v-model="cost.data"
        :min="cost.min"
        :max="cost.max"
        required />
      <label for="cost">Cost (hourly rate)<sup>*</sup></label>
      <div class="validation">
        <span class="invalid" v-if="!cost.isValid">{{
          cost.errorMsg
        }}</span>
        <span class="counter">{{ cost.min }} - {{ cost.max }}</span>
      </div>
    </div>
    <div class="expertises">
      <CoachRegistrationFormVueSelect
        :areas="uniqueAreas"
        :existingAreas="expertises.data"
        :isValid="expertises.isValid"
        ref="vueSelect"
        @set-expertise="addExpertise"
        title="type your expertises:" />
    </div>
    <div class="buttons">
      <BaseSubmitButton :isValid="formIsValid" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
sup {
  color: $red;
  font-weight: 800;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 1.5em;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;

    input,
    textarea {
      background: none;
      border: 0;
      border-bottom: 2px solid $foreground-2;
      &:focus-within,
      &:valid {
        outline: none;
        & + label {
          top: -2em;
          font-size: small;
        }
      }
      &:focus-within {
        background: $background-4;
      }
    }
    label {
      top: 0;
      transition-property: top, font-size;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      pointer-events: none;
      user-select: none;
      position: absolute;
      color: $foreground-2;
    }
    input,
    label,
    textarea {
      padding: 0.3em;
      font-weight: 400;
    }
    textarea {
      resize: vertical;
      min-height: 100px;
      border: 1px solid $background-3;
    }
    .validation {
      display: flex;
      font-size: small;
      .invalid {
        color: $red;
        font-weight: 800;
      }
      .counter {
        font-weight: 300;
        margin-left: auto;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
