import dragSetup from './events/dragSetup';

import vueDragEvent from './utils/vueDragEvent';

// Add draggable configuration to element for the first time
const mountedHook = (el, binding) => {
  dragSetup(el, binding);
};

// Update the drag configuration
const updatedHook = (el, binding) => {
  // Remove events from updated element
  el.onmousedown = null;
  el.ontouchstart = null;

  const handle = typeof binding.oldValue === 'object'
    ? binding.oldValue.handle
    : binding.oldValue;

  const oldHandleArray = document.querySelectorAll(handle);

  oldHandleArray.forEach((oldHandle) => {
  // Remove events from the old handle
    oldHandle.onmousedown = null;
    oldHandle.ontouchstart = null;

    // Remove CSS classes related to the old handle
    oldHandle.classList.remove(window.data.class.handle);
    el.classList.remove(window.data.class.usesHandle);
  });

  // Vue event if anything is updated
  if (binding.oldValue) {
    Object.keys(binding.oldValue).forEach((key) => {
      vueDragEvent(el, `update-${key}`);
    });
  }

  // Add draggable configuration to element
  dragSetup(el, binding);
};

// Create custom directive
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
      move: 'drag-move',
    };

    let removeTransition = true;

    // Replace default event classes with custom ones
    if (options) {
      if (options.eventClass) {
        const classes = options.eventClass;

        Object.keys(classes).forEach((key) => {
          if (classes[key]) {
            window.data.class[key] = classes[key];
          }
        });
      }

      if (typeof options.removeTransition === 'boolean') {
        removeTransition = options.removeTransition;
      }
    }

    // Create stylesheet with basic styling (position, z-index and cursors)
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.${window.data.class.initial}{position:relative;}.${window.data.class.initial}:not(.${window.data.class.usesHandle}),.${window.data.class.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;}.${window.data.class.handle}.${window.data.class.down},.${window.data.class.initial}:not(.${window.data.class.usesHandle}).${window.data.class.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;}`;
    styleElement.innerHTML += removeTransition === true ? `.${window.data.class.move}{transition:none;}` : '';
    document.body.appendChild(styleElement);

    // Register 'v-drag' directive
    Vue.directive('drag', {
      // Hooks for Vue3
      mounted(el, binding) {
        mountedHook(el, binding);
      },

      updated(el, binding) {
        updatedHook(el, binding);
      },

      // Hooks for Vue2
      inserted(el, binding) {
        mountedHook(el, binding);
      },

      update(el, binding) {
        updatedHook(el, binding);
      },
    });
  },
};
