import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useRequestsStore = defineStore('requestsStore', {
  state: () => ({
    requests: [{
      id: 'r1',
      coachId: 'c1',
      userId: 'u1',
      message: 'aaaaaaaaaaaaaaaaaaaaaa',
      sentAbout: 1690204918328,
    },
    {
      id: 'r2',
      coachId: 'c1',
      userId: 'u1',
      message: 'aaaaaaaaaaaaaaaaaaaaaa',
      sentAbout: 1690202908328,
    }] as Request[],
  }),
  getters: {
    getRequestsByCoach: (state) => (coachId: string) => {
      const matchingRequests = state.requests.filter((request) => request.coachId === coachId);
      return matchingRequests;
    },
    getRequestsByUser: (state) => (userId: string) => {
      const matchingRequests = state.requests.filter((request) => request.userId === userId);
      return matchingRequests;
    },
  },
});
