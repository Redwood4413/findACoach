import { State } from 'vue';

export default {
  coaches(state: State) {
    const filter = state.filterArray;

    // eslint-disable-next-line vue/max-len
    return state.coaches.filter((coach) => coach.areas.some((area: string) => filter.includes(area)));
  },
  areas(state: State) {
    const allAreas = state.coaches.flatMap((coach) => coach.areas);
    const uniqueAreas = Array.from(new Set(allAreas));
    return uniqueAreas;
  },
};
