import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
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
        coachRate: 1,
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
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30,
        coachRate: 0,
        reviews: [],
      },
    ],
    filterArray: [],
  }),
  actions,
  getters,
  mutations,
};
