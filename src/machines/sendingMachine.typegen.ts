// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.after(TRANSITION_DELAY)#sending-machine.sent': { type: 'xstate.after(TRANSITION_DELAY)#sending-machine.sent' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {

  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {

  };
  eventsCausingDelays: {
    'TRANSITION_DELAY': 'SUCCESS';
  };
  eventsCausingGuards: {

  };
  eventsCausingServices: {

  };
  matchesStates: 'empty' | 'error' | 'sending' | 'sent';
  tags: never;
}
