import supabase from '@/lib/supabaseClient';
import { loadingMachine } from '@/machines/loadingMachine';
import { useMachine } from '@xstate/vue';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useCoachesStore = defineStore('coachesStore', () => {
  const { state: stateMachine, send } = useMachine(loadingMachine);

  const state = ref({
    coaches: [] as Coach[],
    filterArray: [] as string[],
    uniqueAreas: [] as string[],
    errorMsg: '',
  });

  const getFilteredCoaches = computed(() => {
    const { filterArray } = state.value;

    // eslint-disable-next-line vue/max-len
    return state.value.coaches.filter((coach) => {
      if (!coach.areas) return {};

      return coach.areas.some((area: string) =>
        filterArray.includes(area),
      );
    });
  });
  const getCoaches = computed(() => state.value.coaches);
  const getUniqueAreas = computed(() => {
    const allAreas = state.value.coaches.flatMap(
      (coach) => coach.areas,
    );
    const uniqueAreas = Array.from(new Set(allAreas));
    return uniqueAreas;
  });

  const getCoach = computed(() => (userId: string): Coach | null => {
    const found = state.value.coaches.find(
      (coach) => coach.userId === userId,
    );

    if (!found) return null;

    return found;
  });
  const getFilterArray = computed(() => state.value.filterArray);

  function setFilter(checked: string[]) {
    state.value.filterArray = checked;
  }
  const getErrorMsg = computed(
    () =>
      state.value.errorMsg ||
      'Something went wrong, please again later.',
  );

  function setCoach(coach: Coach) {
    state.value.coaches.push(coach);
  }
  async function fetchCoaches() {
    if (stateMachine.value.matches('loaded')) return;
    send('LOAD');

    try {
      const { data: coaches, error } = await supabase
        .from('coaches_list_view')
        .select('*');

      if (error) throw new Error(error.code);
      coaches.forEach((coach) => {
        setCoach(coach);
      });
      send('SUCCESS');
    } catch (error) {
      send('ERROR');
      // state.value.errorMsg = error;
    }
  }

  function reloadCoaches() {
    send('LOAD');
    state.value.coaches = [];
    fetchCoaches();
  }

  return {
    stateMachine,
    send,
    getFilteredCoaches,
    getUniqueAreas,
    getCoach,
    reloadCoaches,
    getFilterArray,
    setFilter,
    setCoach,
    fetchCoaches,
    getErrorMsg,
    getCoaches,
  };
});
