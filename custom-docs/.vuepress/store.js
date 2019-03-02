import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navbar: {
      main: [
        {
          text: 'Docs',
          link: '/installation.html'
        },
        {
          text: 'Playground',
          link: '/playground.html'
        }
      ],

    }
  }
});
