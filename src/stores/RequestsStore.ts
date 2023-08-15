import supabase from '@/lib/supabaseClient';
import { loadingMachine } from '@/machines/loadingMachine';
import { useMachine } from '@xstate/vue';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useRequestsStore = defineStore('requestsStore', () => {
  const state = ref({
    requests: [] as Request[],
  });
  const { state: stateMachine, send } = useMachine(loadingMachine);

  function setRequest(request: Request) {
    state.value.requests.unshift(request);
  }
  async function fetchRequests(coachId: string) {
    try {
      if (stateMachine.value.matches('loaded')) return;

      send('LOAD');
      const { data, error } = await supabase.from('requests')
        .select('*')
        .eq('coachId', coachId);

      if (error) {
        throw new Error(`Failed!: ${error.message}`);
      }
      send('SUCCESS');
    } catch (error) {
      send('ERROR');
      console.log(error);
    }
  }
});
//   state: () => ({
//     requests: [{
//       id: 'r1',
//       coachId: 'c1',
//       userId: 'u1',
//       message: 'aaaaaaaaaaaaaaaaaaaaaa',
//       sentAbout: 1690204918328,
//     },
//     {
//       id: 'r2',
//       coachId: 'c1',
//       userId: 'u1',
//       message: 'aaaaaaaaaaaaaaaaaaaaaa',
//       sentAbout: 1690202908328,
//     }] as Request[],
//   }),
//   getters: {
//     getRequestsByCoach: (state) => (coachId: string) => {
//       const matchingRequests = state.requests.filter((request) => request.coachId === coachId);
//       return matchingRequests;
//     },
//     getRequestsByUser: (state) => (userId: string) => {
//       const matchingRequests = state.requests.filter((request) => request.userId === userId);
//       return matchingRequests;
//     },
//   },
// });
