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
  getCoach: (state: State) => (id: string) => {
    const index = state.coaches.findIndex((coach) => coach.id === id);

    return state.coaches[index];
  },
  getRate: (state: State) => (id: string) => {
    const index = state.coaches.findIndex((coach) => coach.id === id);

    return state.coaches[index].coachRate;
  },
  getReviews: (state: State) => (id: string): object[] => {
    const index = state.coaches.findIndex((coach) => coach.id === id);
    return state.coaches[index].reviews;
  },
  reviewsQuantity: (state: State, getters) => (id: string) => getters.getReviews(id).length,
};
