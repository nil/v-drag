import dragStart from './dragStart';
import dragEnd from './dragEnd';

import getSnappingValues from '../utils/getSnappingValues';
import isValidAxisValue from '../utils/isValidAxisValue';
import eventListener from '../utils/eventListener';
import vueDragEvent from '../utils/vueDragEvent';

export default function (el, binding) {
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
  if (handleSelector instanceof HTMLElement) {
    handleArray.push(handleSelector);
  } else {
    // handleArray.push(document.querySelectorAll(handleSelector));
    document.querySelectorAll(handleSelector).forEach((child) => {
      handleArray.push(child);
    });
  }

  if (handleArray.length !== 0) {
    // Define move element and apply CSS class
    el.classList.add(window.data.class.usesHandle);

    handleArray.forEach((grabElement) => {
      // Apply CSS class to each grab element
      grabElement.classList.add(window.data.class.handle);

      // Add events to start drag with handle
      grabElement.onmousedown = (e) => dragStart(grabElement, el, axis, snap, e);
      grabElement.ontouchstart = (e) => dragStart(grabElement, el, axis, snap, e);
    });
  } else {
    // Add events to start drag without handle
    el.onmousedown = (e) => dragStart(el, el, axis, snap, e);
    el.ontouchstart = (e) => dragStart(el, el, axis, snap, e);
  }

  // Apply CSS classes to the element
  el.classList.add(window.data.class.initial);

  // Vue event on setup
  vueDragEvent(el, 'setup');

  // Add event to end drag
  eventListener(['mouseup', 'touchend'], dragEnd);
}
