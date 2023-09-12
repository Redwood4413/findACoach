<script lang="ts">
import { PropType } from 'vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';

export interface Expertises {
  data: string[];
  isValid: boolean;
  errorMsg?: string;
  max: number;
}

export default {
  name: 'CoachRegistrationFormVueSelect',
  emits: ['set-expertise'],
  props: {
    title: {
      type: String,
      default: 'Input title',
    },
    areas: {
      type: Array as PropType<string[]>,
      required: true,
    },
    existingAreas: {
      type: Array as PropType<string[]>,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    options() {
      return this.areas.filter(
        (area) => !this.existingAreas.includes(area),
      );
    },
    labelClass() {
      return this.expertises.data.length !== 0 ||
        this.input.hasFocus ||
        this.input.data
        ? 'label--active'
        : '';
    },
    highlightedClass() {
      return this.input.hasFocus ? 'highlighted' : '';
    },
  },
  methods: {
    setFocus(inputFocus: boolean) {
      this.input.hasFocus = inputFocus;
    },
    expertisesValidation() {
      const { expertises } = this;
      if (expertises.data.length > expertises.max) {
        this.expertises.isValid = false;
        this.expertises.errorMsg = 'Too much!';
      } else if (expertises.data.length === 0) {
        this.expertises.isValid = false;
        this.expertises.errorMsg = 'At least 1 is needed';
      } else {
        this.expertises.isValid = true;
      }
      this.$emit('set-expertise', this.expertises);
    },
  },
  data: () => ({
    input: {
      data: '',
      isValid: true,
      hasFocus: false,
      maxLen: 24,
      errorMsg: '',
    },
    expertises: {
      data: [],
      isValid: true,
      errorMsg: '',
      max: 20,
    } as Expertises,
  }),
  watch: {
    'input.data': function valid(value) {
      if (value.length > this.input.maxLen) {
        this.input.isValid = false;
        this.input.errorMsg = 'Too many characters!';
      } else {
        this.input.isValid = true;
      }
    },
    'expertises.data': function valid() {
      this.expertisesValidation();
    },
    isValid(value) {
      this.expertises.isValid = value;
    },
  },
  components: {
    vSelect,
  },
};
</script>

<template>
  <div class="select-wrapper">
    <div class="validation">
      <span class="invalid" v-if="!input.isValid">{{
        input.errorMsg
      }}</span>
      <span class="counter">
        {{ input.data.length }}/{{ input.maxLen }}
      </span>
    </div>
    <vSelect
      id="select"
      :class="`${highlightedClass}`"
      multiple
      taggable
      required
      :options="options"
      v-model="expertises.data"
      :selectable="
        (_: string) =>
          expertises.isValid || expertises.data.length === 0
      "
      @search="(search: string) => (input.data = search)"
      @search:focus="input.hasFocus = true"
      @search:blur="input.hasFocus = false">
      <template #no-options="{ search }">
        {{ search }}
      </template>
    </vSelect>
    <label for="select" :class="`${labelClass}`"
      >Your expertises<sup>*</sup>
    </label>
    <div class="validation">
      <span class="invalid" v-if="!expertises.isValid">{{
        expertises.errorMsg
      }}</span>
      <span class="counter">
        {{ expertises.data.length }}/{{ expertises.max }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$font-color: $foreground-3;
.select-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .v-select.highlighted {
    background: $background-4;
  }
  :deep(*) {
    --vs-controls-color: #{$font-color};

    --vs-dropdown-bg: #{$background-1};
    --vs-dropdown-color: #{$font-color};
    --vs-dropdown-option-color: #{$foreground-0};
    --vs-dropdown-option--active-bg: #{$background-4};
    --vs-dropdown-option--active-color: #{$foreground-0};

    --vs-selected-bg: #{$strong-blue};
    --vs-selected-color: #{$foreground-0};

    --vs-search-input-color: #{$foreground-0};

    --vs-state-disabled-bg: #{$background-1};
    --vs-state-disabled-color: #{$red};
    .vs__dropdown-option--disabled {
      opacity: 0.7;
    }
    .vs__dropdown-toggle {
      border: 0;
      border-radius: 0;
      border-bottom: 2px solid $foreground-2;
    }

    .vs__selected,
    .vs__dropdown-menu {
      text-transform: capitalize;
    }
  }
  label {
    position: absolute;
    top: 1em;
    transition-property: top, font-size;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    padding: 0.3em;
    pointer-events: none;
    user-select: none;
    color: $foreground-2;
    font-weight: 400;
    sup {
      color: $red;
      font-weight: 800;
    }
    &.label--active {
      top: -0.5em;
      font-size: small;
    }
  }
  .validation {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    font-size: small;
    .invalid {
      color: $red;
      font-weight: 800;
    }
    .counter {
      font-weight: 300;
    }
  }
}
</style>
