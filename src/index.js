import dragStart from './events/dragStart';
import dragEnd from './events/dragEnd';

import deepMerge from './utils/deepMerge';
import defaultOptions from './utils/defaultOptions';
import eventListener from './utils/eventListener';
import getSnappingValues from './utils/getSnappingValues';
import isValidAxisValue from './utils/isValidAxisValue';
import vueDragEvent from './utils/vueDragEvent';

// Add draggable configuration to element for the first time
const mountedHook = (el, binding, definedOptionsParam) => {
  const handleList = [];
  let definedOptions = definedOptionsParam;

  // if (binding.oldValue) {
  //   // console.log('oldValue');
  //   // console.log(binding.value);
  //   // TODO: validate user values
  //   definedOptions = deepMerge({}, definedOptionsParam, binding.oldValue);
  // } else

  if (binding.value) {
    // TODO: validate user values
    definedOptions = deepMerge({}, definedOptionsParam, binding.value);
  }

  // Modify the `snap` option to the correct format
  definedOptions.snap = getSnappingValues(definedOptions.snap);

  const value = binding.value || {};
  const handleSelector = value instanceof Object ? value.handle : value;
  const snap = getSnappingValues(value.snap);
  const handleArray = [];
  let axis;

  // Update axis value
  if (value instanceof Object && value.axis && isValidAxisValue(value.axis)) {
    axis = value.axis;
  } else if (isValidAxisValue(binding.arg)) {
    axis = binding.arg;
  } else {
    axis = 'all';
  }

  // Store all the DOM elements that will be used as handles.
  // They can be declared using a string with a CSS tag, class or id, or using Vue refs.
  if (definedOptions.handle instanceof HTMLElement) {
    handleList.push(definedOptions.handle);
  } else {
    document.querySelectorAll(definedOptions.handle).forEach((child) => {
      handleList.push(child);
    });
  }

  if (handleList.length !== 0) {
    // Define move element and apply CSS class
    el.classList.add(window.data.class.usesHandle);

    handleList.forEach((grabElement) => {
      // Apply CSS class to each grab element
      grabElement.classList.add(window.data.class.handle);

      // Add events to start drag with handle
      grabElement.onpointerdown = (e) => dragStart(grabElement, el, definedOptions, e);
    });
  } else {
    // Add events to start drag without handle
    el.onpointerdown = (e) => dragStart(el, el, definedOptions, e);
  }

  // Apply CSS classes to the element
  el.classList.add(window.data.class.initial);

  // Vue event on setup
  vueDragEvent(el, 'setup');

  // Add event to end drag
  document.addEventListener('pointerup', dragEnd, false);
};

// Update the drag configuration
const updatedHook = (el, binding, definedOptionsParam) => {
  // TODO: Remove all events and classess and stuff from the previous values

  console.warn('updaaate');
  // // const definedOptions = definedOptionsParam;
  // // Remove events from updated element
  // el.onpointerdown = null;

  // const handle = typeof binding.oldValue === 'object'
  //   ? binding.oldValue.handle
  //   : binding.oldValue;

  // const oldHandleArray = document.querySelectorAll(handle);

  // oldHandleArray.forEach((oldHandle) => {
  // // Remove events from the old handle
  //   oldHandle.onpointerdown = null;

  //   // Remove CSS classes related to the old handle
  //   oldHandle.classList.remove(window.data.class.handle);
  //   el.classList.remove(window.data.class.usesHandle);
  // });

  // // Vue event if anything is updated
  // if (binding.oldValue) {
  //   Object.keys(binding.oldValue).forEach((key) => {
  //     vueDragEvent(el, `update-${key}`);
  //   });
  // }

  // Add draggable configuration to element
  // mountedHook(el, binding, definedOptions);
  console.warn('UPDAAAATED');
  mountedHook(el, binding, definedOptionsParam);
};

// const mountedHook = (el, binding, definedOptionsParam) => {
//   console.log('mounted');

//   let definedOptions = definedOptionsParam;

//   if (binding.value) {
//     definedOptions = deepMerge({}, definedOptionsParam, binding.value);
//   }

//   console.log(binding.value);
//   console.log(definedOptions);
// };

// const updatedHook = (el, binding, definedOptionsParam) => {
//   // let definedOptions = definedOptionsParam;
//   console.log('updated');
//   mountedHook(el, binding, definedOptionsParam);

//   // console.log(definedOptions);
// };

// Create custom directive
export default {
  install(Vue, options) {
    // TODO: Validate user values
    const definedOptions = deepMerge({}, defaultOptions, options);

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
        mountedHook(el, binding, definedOptions);
      },

      updated(el, binding) {
        updatedHook(el, binding, definedOptions);
      },

      // Hooks for Vue2
      inserted(el, binding) {
        mountedHook(el, binding, definedOptions);
      },

      update(el, binding) {
        updatedHook(el, binding, definedOptions);
      },
    });
  },
};
