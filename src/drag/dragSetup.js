import dragStart from './dragStart';
import dragEnd from './dragEnd';

import isValidAxisValue from '../utils/isValidAxisValue';
import eventListener from '../utils/eventListener';

export default function (el, binding, vnode) {
  console.log('setup');

  const value = binding.value;
  const handle = value instanceof Object ? value.handle : value;

  // Update axis value
  if (value instanceof Object && value.axis && isValidAxisValue(value.axis)) {
    vnode.axis = value.axis;
  } else if (isValidAxisValue(binding.arg)) {
    vnode.axis = binding.arg;
  } else {
    vnode.axis = 'all';
  }

  // Update handle value
  const handleElement = document.getElementById(handle);

  if (value && (typeof value === 'string' || value.handle) && !handleElement) {
    // Throws error when handle is defined but it doesn't exist
    throw Error(`Element with id “${value.handle || value}” doesn’t exist`);
  } else {
    if (handleElement) {
      // Define roles of the elements
      vnode.grab = handleElement;
      vnode.move = el;

      // TODO: Apply CSS classes related to the handle
    } else {
      vnode.grab = el;
      vnode.move = el;
    }

    // TODO: Apply CSS classes to the element

    // Add event to start drag
    vnode.grab.onmousedown = e => dragStart(e);
    vnode.grab.ontouchstart = e => dragStart(e);
  }

  // Save vnode as a global variable
  window.vnode = vnode;

  // Add event to end drag
  eventListener(['mouseup', 'touchend'], dragEnd);
}
