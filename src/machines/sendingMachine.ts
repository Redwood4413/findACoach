import { createMachine } from 'xstate';

interface Events {
  type: 'SEND' | 'SUCCESS' | 'ERROR';
}

const sendingMachine = createMachine(
  {
    // eslint-disable-next-line vue/max-len
    /** @xstate-layout N4IgpgJg5mDOIC5SzAOwgS1VAtAWwEMBjACyzADow8AHAFwE8BiAZQFEA5AEQG0AGALqJQNAPawMdDKNTCQAD0QBGAGwqKAFgDsATiVaAHEoN6VAJjNaANCAaITFAwFYlTlQYMqAzF6d8dXgC+gTYo6Fi4hKTkFGGY2KwAqgDCyWwsLPxCSCBiElIycooIGnwaFFraGko6Zl5avjoqNnYIxmaafOZOnv5epSrBoWjxkcRkqJRxEUxsAEpzAPJzWXJ5ktKyOcWl5ZWVNXUNTk0tyl5KFDoalkoaBroeGjdDINPY+OMxYXRM8rB0Ah0SgEABmwIATgAKLx8OEASiY7zG0UmsTQdFWOXWBS2oB2rgoKh0uhcKicWjMShqTjOCDqHU8JK0Sj4rJUN1qr2Rn1RlDAEIhoghrE4vEEa3EG0K20QGl8FCcTm0ZjZtT4TjMJLpRk0un01L8NwMVOCIRAqFEEDgch5UQmYEl+U2RUQOGatjd6jhPt9fq03JGEV5DqotEYTuleIUcrMdJ0Bk0qtcN1VdX6gfCH3t3yD2EjuNd9K0fAoZncZmqZSMJN88dLPmcGicsIsPm8mdGIdzqDoBZdsoQLZ0FH6XgMcJ0mpMfDjnraHj1930zmuZhrneDObRAqFEP7MvxiGHo-lE-8050s-rFDKWkqKi6zdqDTNgSAA */

    id: 'sending-machine',
    initial: 'empty',
    schema: {
      events: {} as Events,
    },
    context: {
      timing: 3000,
    },
    tsTypes: {} as import('./sendingMachine.typegen').Typegen0,
    predictableActionArguments: true,
    states: {
      empty: {
        on: {
          SEND: {
            target: 'sending',
          },
        },
      },
      sending: {
        on: {
          SUCCESS: {
            target: 'sent',
          },
          ERROR: {
            target: 'error',
          },
        },
      },

      sent: {
        after: {
          TRANSITION_DELAY: { target: 'empty' },
        },
      },
      error: {
        on: {
          SEND: {
            target: 'sending',
          },
        },
      },
    },
  },
  {
    delays: {
      TRANSITION_DELAY: (context) => context.timing,
    },
  },
);

export default sendingMachine;
