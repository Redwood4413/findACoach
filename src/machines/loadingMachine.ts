import { createMachine } from 'xstate';

interface Events {
  type: 'LOAD' | 'SUCCESS' | 'ERROR' | 'EMPTY';
}
// eslint-disable-next-line import/prefer-default-export
export const loadingMachine = createMachine({
  // eslint-disable-next-line vue/max-len
  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2BDCBLAdlAtALboDGAFrmAHRiEAOALgJ4DEAMgPICCAIgNoAGALqJQdVLCwMsqHKJAAPRAEYAbMqoAWAOwBOZQA5tAJjUHla4wBoQTRLuNUArMdUCnAgMy6BAw6s0AX0CbNExcAmJySiow7DwWAGUAVQBhVIBRRMTBESQQcUlpWXklBE0BXSptHU1NT2VPA1UnXScnGzsEY09HZt0DP16vZVdPYNCMeMjSChxqOIiWDIAlFY4V3PlCqRk5fLKKqpqa+sbm1vbOlQaqXU1jbWVtP00DTVVtCZBFvCJZmJxSDsbj8YTbCS7EoHRB1ATOJw6TwfAzvYwPa4IQyOCqqYytNTaJx6L4hH5TCL-aLzGgAJ1pqFpIN4W3yO2K+1AhwqCKRKLRGNsiHMWj0zzeeIsnlJZJwqAgcHkvxm1LAEKKe1KiHwqkxOu+yqpc2otEYXTEkI5WvK1iFCF0nioQwExgM+gG2lUDgNFL+UWNsV9UHVUM5ikQricVFcBnxrVM7z0mIdTsaLrdyg9XuMPvCfoBNKBEBDVphCERmioyKaXm8yLcurtmfhuhqBk8LlG9wEqlUuemRpiYHpjJLmrLFar9UGnjrHx7yfhAh0RMqAhOOmUwWCQA */

  id: 'loading-machine',
  initial: 'empty',
  schema: {
    events: {} as Events,
  },
  tsTypes: {} as import('./loadingMachine.typegen').Typegen0,
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
