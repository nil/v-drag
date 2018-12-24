/**
 * OTHER CHANGES
 *
 * - Improved method to detect if a handle is invalid
 */

import dragSetup from './drag/dragSetup';

export default {
  install(Vue) {
    Vue.directive('drag', {

      // Add draggable configuration to element for the first time
      inserted(el, binding, vnode) {
        dragSetup(el, binding, vnode);
      }
    });
  }
};
