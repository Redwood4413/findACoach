import supabase from '@/lib/supabaseClient';
import { loadingMachine } from '@/machines/loadingMachine';
import { useMachine } from '@xstate/vue';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useUsersStore = defineStore('usersStore', () => {
  const state = ref({
    users: [] as User[],
    errorMsg: '',
  });

  const { state: stateMachine, send } = useMachine(loadingMachine);

  const getUserIds = computed(() =>
    state.value.users.map((user) => user.userId),
  );

  const getFilteredIds = computed(() => {
    const ids = getUserIds.value;

    return state.value.users.map((user) =>
      ids.filter((id) => user.userId.includes(id)),
    );
  });

  async function fetchUsers() {
    if (stateMachine.value.matches('loaded')) return;

    send('LOAD');
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .not('userId', 'in', existingUsersId);

      if (error) throw new Error(`Failed! ${error.message}`);

      users.forEach((user) => {});
      send('LOADED');
    } catch (error) {
      send('ERROR');
      state.value.errorMsg = error;
    }
  }
  function setUser(user: User) {
    state.value.users.push(user);
  }
  const getUser = computed(() => async (userId: string) => {
    const found = state.value.users.find((user) => user.userId === userId);

    if (!found) {
      await fetchUsers(userId);
    }
  });
  const getFullName = computed(() => (userId: string) => {
    const user = getUser.value(userId);

    return `${user.firstName}`;

    // return found ? state.value.users.
  });
  return {
    getUserIds,
  };
});

//   state: () => ({
//     users: [{
//       id: 'VSLZSMV2RQ',
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john-doe@gmail.com',
//     },
//     {
//       id: 'TEST321',
//       firstName: 'John',
//       lastName: 'Smith',
//       email: 'john-smith@gmail.com',
//     }] as User[],
//   }),
//   getters: {
//     getUser() {
//       return (userId: string): User => {
//         const found = this.users.find((user) => user.id === userId);

//         if (!found) {
//           throw new Error(`User with ID: ${userId} not found!`);
//         }

//         return found;
//       };
//     },
//     getFullName() {
//       return (userId: string): string => {
//         const { firstName, lastName } = this.getUser(userId);

//         return `${firstName} ${lastName}`;
//       };
//     },
//     getEmail() {
//       return (userId: string): string => {
//         const { email } = this.getUser(userId);

//         return email;
//       };
//     },
//   },
// });
