import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import supabase from '@/lib/supabaseClient';
import { useMachine } from '@xstate/vue';
import { loadingMachine } from '@/machines/loadingMachine';

// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('authStore', () => {
  const { state: stateMachine, send } = useMachine(loadingMachine);
  const state = ref({
    user: {
      userId: '',
      firstName: '',
      lastName: '',
      age: null,
      email: '',
      registerDate: 0,
      isLoggedIn: false,
      isCoach: false,
      isAdmin: false,
    } as User,
    isGuest: false,
  });
  const userId = computed(() => state.value.user.userId);

  const isCoach = computed(() => state.value.user.isCoach);

  const isLoggedIn = computed(() => state.value.user.isLoggedIn);

  const isGuest = computed(() => state.value.isGuest);
  function setUser(user: User) {
    state.value.user = user;
  }
  const fullName = computed(() =>
    !isGuest.value
      ? `${state.value.user.firstName} ${state.value.user.lastName}`
      : 'Guest',
  );
  function handleGuestUser() {
    send('SUCCESS');
  }
  async function fetchUser(id: string = 'heheszki') {
    send('LOAD');
    if (isGuest.value) {
      handleGuestUser();
      return;
    }
    if (state.value.user.isLoggedIn) return;
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('userId', id)
        .single();

      if (error) throw new Error(`Failed!: ${error.message}`);

      setUser(user);
      send('SUCCESS');
    } catch (error) {
      console.log(error);
      send('ERROR');
    }
  }

  return {
    userId,
    setUser,
    fetchUser,
    fullName,
    stateMachine,
    isLoggedIn,
    isCoach,
  };
});
