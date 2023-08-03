<script lang="ts">
import { useCoachesStore } from '@/stores/CoachesStore';
import { PropType } from 'vue';
import BaseDropdownMenu from '../UI/BaseDropdownMenu.vue';

export default {
  name: 'CoachRegistrationFormInputWithSuggests',
  components: { BaseDropdownMenu },
  setup() {
    const coachesStore = useCoachesStore();

    return { coachesStore };
  },
  emits: ['set-expertise', 'error'],
  props: {
    title: {
      type: String,
      default: 'Input title',
    },
    existingItems: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data: () => ({
    suggestions: {
      data: [] as string[],
      isVisible: false,
      selectedId: -1,
    },
    input: {
      data: '',
      isValid: true,
      errorMsg: '',
      maxLen: 24,
    },
    word: {
      matching: '',
      rest: '',
    },
  }),
  methods: {
    submitData(input: string) {
      this.input.data = input;
      if (!this.input.isValid) return;
      if (this.checkIfIncludes(input)) {
        this.setError(`${input} already exists!`);
        this.input.isValid = false;
        return;
      }
      this.input.errorMsg = '';
      this.input.data = '';
      this.$emit('set-expertise', input);
      this.searchSuggestion();
    },
    setError(error: string) {
      this.input.errorMsg = error;
    },
    searchSuggestion() {
      const input = this.input.data;
      this.suggestions.data = [];
      const regex = new RegExp(`^${input}`, 'i');

      this.expertises.forEach((expertise) => {
        const found = regex.test(expertise);
        if (found) {
          if (!this.checkIfIncludes(expertise)) {
            this.suggestions.data.push(expertise);
          }
        }
      });
      if (this.suggestions.data.length > 0) {
        this.showSuggestions();
      } else {
        this.hideSuggestions();
      }
    },
    checkIfIncludes(item: string): boolean {
      const { existingItems } = this;

      return !!existingItems.includes(item);
    },
    showSuggestions() {
      if (this.suggestions.isVisible) return;
      if (this.suggestions.data.length === 0) return;

      this.suggestions.isVisible = true;
      this.setSelectedId(-1);
    },
    hideSuggestions() {
      if (!this.suggestions.isVisible) return;

      this.suggestions.isVisible = false;
      this.setSelectedId(-1);
    },
    hideSuggestionsByFocus(event: FocusEvent) {
      const { form }: { form: HTMLFormElement } = this.$refs;
      if (form.contains(event.relatedTarget)) return;

      this.suggestions.isVisible = false;
      this.setSelectedId(-1);
    },

    handleKeyboard(event: KeyboardEvent) {
      const { key } = event;
      if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
      const { data } = this.suggestions;

      if (key === 'ArrowDown') this.suggestions.selectedId += 1;
      if (key === 'ArrowUp') this.suggestions.selectedId -= 1;

      const { selectedId } = this.suggestions;
      if (selectedId < 0) this.suggestions.selectedId = data.length - 1;
      if (selectedId > data.length - 1) this.suggestions.selectedId = 0;
    },
    clearInput() {
      this.input.data = '';
    },

    setSelectedId(id: number) {
      this.suggestions.selectedId = id;
    },
    setInput(id: number) {
      this.input.data = this.suggestions.data[id];
    },
    preventScrolling(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') event.preventDefault();
    },
    selectedClass(index: number) {
      return index === this.suggestions.selectedId ? 'selected' : '';
    },
    formatString(input: string): { matching: string, rest: string } {
      const matching = input.slice(0, this.input.data.length);
      const rest = input.slice(this.input.data.length);
      return { matching, rest };
    },
    isValid(): boolean {
      const { input } = this;

      if (input.data.length > input.maxLen) {
        this.input.isValid = false;
        return false;
      }
      this.input.isValid = true;
      return true;
    },
  },
  computed: {
    expertises() {
      return this.coachesStore.getUniqueAreas;
    },
  },
  watch: {
    'input.data': function input() {
      this.isValid();
      this.searchSuggestion();
      this.setSelectedId(-1);
    },
  },
};
</script>

<template>
  <form
    class="form-expertises"
    @submit.prevent="submitData(input.data)"
    @focusout="hideSuggestionsByFocus"
    @focusin="showSuggestions"
    @keydown="handleKeyboard"
    ref="form"
    novalidate
  >
    <div class="input-wrapper">
      <input
        type="text"
        v-model.trim="input.data"
        id="expertise"
        @focus="searchSuggestion"
        autocomplete="off"
        required
      >
      <label for="expertise">{{ title }}</label>
      <div class="validation">
        <span class="invalid" v-if="!input.isValid">{{ input.errorMsg}}</span>
        <span class="counter">{{ input.data.length }} / {{ input.maxLen }}</span>
      </div>
      <BaseDropdownMenu
        v-if="suggestions.isVisible"
      >
        <li class="list">
          <button
            type="submit"
            v-for="(suggestion, index) in suggestions.data"
            :key="index"
            @focus="setSelectedId(index)"
            @blur="setSelectedId(-1)"
            :class="selectedClass(index)"
            @keydown="preventScrolling"
            @mouseover="setSelectedId(index)"
            @mouseleave="setSelectedId(-1)"
            @click="submitData(suggestion)"
          >
            <span class="underline">{{ formatString(suggestion).matching }}</span>
            <span>{{ formatString(suggestion).rest }}</span>
          </button>
        </li>
      </BaseDropdownMenu>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  @use '@/colors.scss';

    .form-expertises {
      position: relative;
      display:flex;
      flex-direction: column;
      flex:0;
      .input-wrapper {
        .list {
          display:flex;
          flex-direction: column;
          max-height: 230px;
          overflow: auto;
          button {
            transition: background .1s ease-in-out;
            font-weight: 300;
            margin:0;
            background: none;
            text-align: left;
            cursor: pointer;
            border-radius: 0;
            padding:0.3em;
            outline: none;
            &:not(:last-child) {
              border-bottom: 2px solid colors.$gray;
            }
            &.selected {
              background: colors.$background-3;
            }
          }
        }
      }
    }

</style>
