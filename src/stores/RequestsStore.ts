import supabase from '@/lib/supabaseClient';
import { loadingMachine } from '@/machines/loadingMachine';
import { useMachine } from '@xstate/vue';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useRequestsStore = defineStore('requestsStore', () => {
  const state = ref({
    requests: [] as Request[],
  });
  const { state: stateMachine, send } = useMachine(loadingMachine);

  function setRequest(request: Request) {
    state.value.requests.unshift(request);
  }
  const getRequests = computed(() => state.value.requests);

  async function fetchRequests(coachId: string) {
    try {
      if (stateMachine.value.matches('loaded')) return;

      send('LOAD');
      const { data, error } = await supabase
        .from('requests_list_view')
        .select('*')
        .eq('coachId', coachId);

      if (error) {
        throw new Error(`Failed!: ${error.message}`);
      }
      data.forEach((request) => {
        setRequest(request);
      });

      send('SUCCESS');
    } catch (error) {
      send('ERROR');
      console.log(error);
    }
  }
  return {
    setRequest,
    getRequests,
    fetchRequests,
  };
});
