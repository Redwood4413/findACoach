import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('authStore', () => {
  const state = ref({
    isLoggedIn: true,
    userId: 'teeeeeeeeest',
  });

  const getUserId = computed(() => state.value.userId);

  return {
    getUserId,
  };
});
