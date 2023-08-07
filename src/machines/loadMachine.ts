import { createMachine } from 'xstate';

// eslint-disable-next-line import/prefer-default-export
export const loadMachine = createMachine({
  // eslint-disable-next-line vue/max-len
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAtAWwENsBLAOzADow8AHNATwGIAZAeQEEARAbQAYBdRKBoB7WMTTERpISAAeiAIwAWABwUVAVlUBmbQHZ9ygJy9NAGhD1ExgEwVNtgGxmdvY4t13bAXx+XUTFxCEnIKABsRAggyKEYAZQBVAGFkgFF4+L5BJBBRcUlpWQUEHVVFCl5VVU0TXls3HWVeHUtrBAb7VSdjfWMnW2blbR0dPwD0bHwiLDJKSOjYxjSAJRXWFezZfIkpGVySsoqqmrqGlubWqyUdCuNlW31FXic9W2dlJ3GQQKmQ2bCCwgkBYHB4Am2Yl2RQOiEuFEeLhMTn0ul4L2UbSUqnszQGmiaOlRD2U31+wRmcyoACdqSJqaCuFtcjtCvtQCV4YjeMjUW4MViEOUKMo+ooUbpnM8CX5-CBSCJgfBcuTpqEwJCCntiogcE5BThNBRjCbTWazWM5ar-lTqHR2sIoWydQgHoLjDpKopGu9tIpbN7SVbJhT1REojFSFBNdD2fJEINjMaHk9bsNanpMdcEB6vW5FJp9I99E4XJaJkE1QD5hHIDHnbCEJozJUi3Yep89ETBYpTMajGjeAW+sYamSQ1XbbT6fXtY3m0beG3nPdXgT9O7eJVRUZlMppSiPbKfEA */

  id: 'fetch-machine',
  initial: 'empty',
  tsTypes: {} as import('./loadMachine.typegen').Typegen0,
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
