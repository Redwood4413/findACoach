import { createMachine } from 'xstate';

// eslint-disable-next-line import/prefer-default-export
export const coachesMachine = createMachine({
  // eslint-disable-next-line vue/max-len
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BDZALOA6MAtgA4AuAngMQAyA8gIIAiA2gAwC6ioRqsAlib1QA7TiAAeiAIwA2SbgAsAdgCckxQFZp6xSxaSAzOoA0IMlMWLcLbQCYN8+XenLF0gL5uTaTDli4ANhgQvEJQFADKAKoAwtEAouHhrBxIINx8AsKiEgj6ysq4ikryLKoAHDbK0mX6JmYINvo2uGXOZSxaOpIslR5eGNh4gejBoRRxAEoTNBPJoun8giKpOXkFRUWlkhVVNXVS+nLKjjo9SpKa230g3oN+wxCQ1PTM7PM8i1kriPL6LLjqdTyaSKbY2dQ2eTKfYIMEKDqNaT6HQWRSQ663Xz4ABO2NQ2OejDmqQWmWWoByv3+gOBoIqEKhMLKciUqmk8kkjXUhhkHk8ICEqEe8FSmLg7wyS2yiAAtNIYXKMQMsYRSPUuB8ydKEI4YWpLEDHIDlD08kClT4hkEQlAJZ9yeJEDYtLhnRV9IZwVVnLVTOYDQ5weoTY1lOb+WL7kFIHatd8ENz5Lh9L8ikCbJJgZUYTY7IUNJJlJVSu1AWULXccXjsbGpfHE8nU-J05npNm-bDnS15O1WupWmV+2Vy3ygA */
  id: 'coaches',
  initial: 'empty',
  tsTypes: {} as import('./coachesMachine.typegen').Typegen0,
  predictableActionArguments: true,
  states: {
    empty: {
      on: {
        LOAD: {
          target: 'loading',
        },
      },
    },

    loading: {
      on: {
        SUCCESS: {
          target: 'loaded',
        },
        ERROR: {
          target: 'error',
        },
      },
    },

    loaded: {
      on: {
        LOAD: {
          target: 'loading',
        },
      },
    },

    error: {
      on: {
        LOAD: {
          target: 'loading',
        },
      },
    },
  },
});
