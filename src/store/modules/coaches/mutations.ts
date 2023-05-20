import { State } from 'vue';

export default {
  setFilter(state: State, checked: string[]) {
    state.filterArray = checked;
  },
};
