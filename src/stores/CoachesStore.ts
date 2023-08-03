import { coachesMachine } from '@/machines/coachesMachine';
import { useMachine } from '@xstate/vue';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useCoachesStore = defineStore('coachesStore', () => {
  const { state: stateMachine, send } = useMachine(coachesMachine);

  const state = ref({
    coaches: [] as Coach[],
    filterArray: [] as string[],
    errorMsg: '',
  });

  const getFilteredCoaches = computed(() => {
    const filter = state.value.filterArray;
    // eslint-disable-next-line vue/max-len
    return state.value.coaches.filter((coach) => coach.areas.some((area: string) => filter.includes(area)));
  });

  const getUniqueAreas = computed(() => {
    const allAreas = state.value.coaches.flatMap((coach) => coach.areas);
    const uniqueAreas = Array.from(new Set(allAreas));
    return uniqueAreas;
  });

  const getCoach = computed(() => (id: string): Coach | null => {
    const found = state.value.coaches.find((coach) => coach.id === id);

    if (!found) return null;

    return found;
  });
  const getFilterArray = computed(() => state.value.filterArray);

  function setFilter(checked: string[]) {
    state.value.filterArray = checked;
  }
  const getErrorMsg = computed(() => state.value.errorMsg || 'Something went wrong, please again later.');

  async function addCoach(coach: Coach) {
    const fetchUrl = `${import.meta.env.VITE_FIREBASE_URL}coaches/${coach.id}.json`;
    const fetchOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(coach),
    };

    const response = await fetch(fetchUrl, fetchOptions);

    return response;
  }
  function setCoach(coach: Coach) {
    state.value.coaches.push(coach);
  }
  async function fetchCoaches() {
    if (stateMachine.value.matches('loaded')) return;
    send('LOAD');

    const fetchUrl = `${import.meta.env.VITE_FIREBASE_URL}coaches.json`;
    try {
      const rawResponse = await fetch(fetchUrl);
      if (!rawResponse.ok) {
        send('ERROR');
        throw new Error(rawResponse.statusText);
      }
      const parsedResponse = await rawResponse.json();
      Object.keys(parsedResponse).forEach((id) => {
        Object.keys(parsedResponse[id]).forEach((key) => {
          setCoach(parsedResponse[id][key]);
        });
      });

      send('SUCCESS');
    } catch (error) {
      state.value.errorMsg = error as string;
    }
  }
  function reloadCoaches() {
    send('LOAD');
    state.value.coaches = [];
    console.log(stateMachine.value);
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
    addCoach,
    setCoach,
    fetchCoaches,
    getErrorMsg,
  };
});
