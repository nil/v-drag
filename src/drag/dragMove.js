import eventListener from '../utils/eventListener';
import returnPositionString from '../utils/returnPositionString';

export function updatePosition(x, y) {
  // Store relative coordinates
  window.data.relativeX = window.data.mouseX * x;
  window.data.relativeY = window.data.mouseY * y;

  // Apply transformation to move element
  window.data.move.style.transform = returnPositionString(
    window.data.matrix,
    window.data.matrixX + window.data.relativeX,
    window.data.matrixY + window.data.relativeY,
  );
}

export const callPositionUpdate = {
  x() { updatePosition(true, false); },
  y() { updatePosition(false, true); },
  all() { updatePosition(true, true); }
};

export function repeatRaf() {
  callPositionUpdate[window.data.axis](window.data);
  window.data.posAnimation = requestAnimationFrame(repeatRaf);
}

export default function setUpMovement() {
  // TODO: Apply CSS class to move element

  // Begin moving animation
  window.data.posAnimation = requestAnimationFrame(repeatRaf);

  // Avoid this function to fire another time
  eventListener(['mousemove', 'touchmove'], setUpMovement, 'remove');
}
