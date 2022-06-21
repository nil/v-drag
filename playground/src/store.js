import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      axis: 'all',
    };
  },

  mutations: {
    updateValue(state, n) {
      state[n.property] = n.value;
    },
  },
});

export default store;
