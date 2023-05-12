import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    coaches: CoachesState[],
    filterArray: string[],
    areas: Areas,
  }
  interface CoachesState {
    id: string,
    firstName: string,
    lastName: string,
    areas: string[]
    description: string,
    hourlyRate: number,
  }
  interface Areas {
    areas: string[];
  }
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
