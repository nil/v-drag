import dragStart from './dragStart';
import dragEnd from './dragEnd';

import isValidAxisValue from '../utils/isValidAxisValue';
import eventListener from '../utils/eventListener';

export default function (el, binding) {
  const value = binding.value;
  const handle = value instanceof Object ? value.handle : value;
  let axis; let grabElement; let moveElement;

  // Update axis value
  if (value instanceof Object && value.axis && isValidAxisValue(value.axis)) {
    axis = value.axis;
  } else if (isValidAxisValue(binding.arg)) {
    axis = binding.arg;
  } else {
    axis = 'all';
  }

  // Update handle value
  const handleElement = document.getElementById(handle);

  if (value && (typeof value === 'string' || value.handle) && !handleElement) {
    // Throws error when handle is defined but it doesn't exist
    throw Error(`Element with id “${value.handle || value}” doesn’t exist`);
  } else {
    if (handleElement) {
      // Define roles of the elements
      grabElement = handleElement;
      moveElement = el;

      // TODO: Apply CSS classes related to the handle
      grabElement.classList.add(window.data.class.handle);
      moveElement.classList.add(window.data.class.usesHandle);
    } else {
      grabElement = el;
      moveElement = el;
    }

    // TODO: Apply CSS classes to the element
    moveElement.classList.add(window.data.class.initial);

    // Add event to start drag
    grabElement.onmousedown = e => dragStart(grabElement, moveElement, axis, e);
    grabElement.ontouchstart = e => dragStart(grabElement, moveElement, axis, e);
  }

  // Add event to end drag
  eventListener(['mouseup', 'touchend'], dragEnd);
}
