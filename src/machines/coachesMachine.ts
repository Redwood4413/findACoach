import { createMachine } from 'xstate';

// eslint-disable-next-line import/prefer-default-export
export const coachesMachine = createMachine({
  id: 'coaches',
  initial: 'empty',
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
