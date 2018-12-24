import eventListener from '../utils/eventListener';
import returnPositionString from '../utils/returnPositionString';

export function updatePosition(x, y) {
  // Store relative coordinates
  window.vnode.relativeX = window.vnode.mouseX * x;
  window.vnode.relativeY = window.vnode.mouseY * y;

  // Apply transformation to move element
  window.vnode.move.style.transform = returnPositionString(
    window.vnode.matrix,
    window.vnode.matrixX + window.vnode.relativeX,
    window.vnode.matrixY + window.vnode.relativeY,
  );
}

export const callPositionUpdate = {
  x() { updatePosition(true, false); },
  y() { updatePosition(false, true); },
  all() { updatePosition(true, true); }
};

export function repeatRaf() {
  callPositionUpdate[window.vnode.axis](window.vnode);
  window.vnode.posAnimation = requestAnimationFrame(repeatRaf);
}

export default function setUpMovement() {
  // TODO: Apply CSS class to move element

  // Begin moving animation
  window.vnode.posAnimation = requestAnimationFrame(repeatRaf);

  // Avoid this function to fire another time
  eventListener(['mousemove', 'touchmove'], setUpMovement, 'remove');
}
