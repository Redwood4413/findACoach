import { defineStore } from 'pinia';

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
}
// eslint-disable-next-line import/prefer-default-export
export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [{
      id: 'VSLZSMV2RQ',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john-doe@gmail.com',
    },
    {
      id: 'u2',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john-smith@gmail.com',
    }] as User[],
  }),
  getters: {
    getUser() {
      return (userId: string): User => {
        const found = this.users.find((user) => user.id === userId);

        if (!found) {
          throw new Error(`User with ID: ${userId} not found!`);
        }

        return found;
      };
    },
    getFullName() {
      return (userId: string): string => {
        const { firstName, lastName } = this.getUser(userId);

        return `${firstName} ${lastName}`;
      };
    },
    getEmail() {
      return (userId: string): string => {
        const { email } = this.getUser(userId);

        return email;
      };
    },
  },
});
