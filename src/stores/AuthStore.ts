import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLoggedIn: true,
    loggedId: 'VSLZSMV2RQ',
  }),
  getters: {
    getLoggedId: (state) => state.loggedId,
  },
});
