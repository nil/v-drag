/**
 * OTHER CHANGES
 *
 * - Improved method to detect if a handle is invalid
 */

import dragSetup from './drag/dragSetup';

export default {
  install(Vue, options) {
    // Initialize 'data' object
    window.data = {};

    // Store default event classes
    window.data.class = {
      initial: 'drag-draggable',
      usesHandle: 'drag-uses-handle',
      handle: 'drag-handle',
      down: 'drag-down',
      move: 'drag-move'
    };

    // Replace default event classes with custom ones
    if (options) {
      const classes = options.eventClass;
      Object.keys(classes).forEach((key) => {
        if (classes[key]) {
          window.data.class[key] = classes[key];
        }
      });
    }

    // Create stylesheet with basic styling (position, z-index and cursors)
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.${window.data.class.initial}{position:relative;}.${window.data.class.initial}:not(.${window.data.class.usesHandle}),.${window.data.class.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;cursor:-moz-grab;}.${window.data.class.handle}.${window.data.class.down},.${window.data.class.initial}:not(.${window.data.class.usesHandle}).${window.data.class.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;cursor:-moz-grabbing;}`;
    document.body.appendChild(styleElement);

    // Register 'v-drag' directive
    Vue.directive('drag', {
      // Add draggable configuration to element for the first time
      inserted(el, binding) {
        dragSetup(el, binding);
      }
    });
  }
};
