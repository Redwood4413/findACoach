import { defineStore } from 'pinia';

interface Review {
  review: string,
  rate: number,
}
interface Coach {
  id: string,
  firstName: string,
  lastName: string,
  areas: string[],
  description: string,
  hourlyRate: number,
  coachRate: number,
  reviews: Review[],
}

// eslint-disable-next-line import/prefer-default-export
export const useCoachesStore = defineStore('CoachesStore', {
  state: () => ({
    coaches: [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well! ",
        hourlyRate: 30,
        coachRate: 3,
        reviews: [{
          review: 'Coach with a great knowledge.',
          rate: 5,
        },
        {
          review: 'Coach with a great knowledge.',
          rate: 3,
        }],
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career', 'frontendd'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30,
        coachRate: 0,
        reviews: [],
      },
    ] as Coach[],
    filterArray: [] as string[],
  }),
  getters: {
    getFilteredCoaches(state) {
      const filter = state.filterArray;
      // eslint-disable-next-line vue/max-len
      return state.coaches.filter((coach) => coach.areas.some((area: string) => filter.includes(area)));
    },
    getUniqueAreas(state) {
      const allAreas = state.coaches.flatMap((coach) => coach.areas);
      const uniqueAreas = Array.from(new Set(allAreas));
      return uniqueAreas;
    },
    getCoach: (state) => (id: string): Coach | null => {
      const found = state.coaches.find((coach) => coach.id === id);

      if (!found) return null;

      return found;
    },
    getRate() {
      return (id: string): number => {
        const coach = this.getCoach(id);

        if (!coach) return 0;

        return coach.coachRate;
      };
    },
    getReviews() {
      return (id: string): Review[] => {
        const coach = this.getCoach(id);

        if (!coach) return [];

        return coach.reviews;
      };
    },
    getReviewsQuantity() {
      const quantity = (id: string) => this.getReviews(id).length;

      return quantity;
    },
  },
  actions: {
    setFilter(checked: string[]) {
      this.filterArray = checked;
    },
  },
});
