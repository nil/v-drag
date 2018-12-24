/**
 * OTHER CHANGES
 *
 * - Improved method to detect if a handle is invalid
 */

import dragSetup from './drag/dragSetup';

const eventClass = {
  initial: 'drag-draggable',
  usesHandle: 'drag-uses-handle',
  handle: 'drag-handle',
  down: 'drag-down',
  move: 'drag-move'
};

export default {
  install(Vue) {
    // Create stylesheet with basic styling (position, z-index and cursors)
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.${eventClass.initial}{position:relative;}.${eventClass.initial}:not(.${eventClass.usesHandle}),.${eventClass.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;cursor:-moz-grab;}.${eventClass.handle}.${eventClass.down},.${eventClass.initial}:not(.${eventClass.usesHandle}).${eventClass.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;cursor:-moz-grabbing;}`;
    document.body.appendChild(styleElement);

    Vue.directive('drag', {
      // Add draggable configuration to element for the first time
      inserted(el, binding, vnode) {
        dragSetup(el, binding, vnode);
      }
    });
  }
};
