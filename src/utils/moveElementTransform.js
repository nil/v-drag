export default function (transform, left, top) {
  const elementsByCoordinates = ['rect', 'circle', 'text', 'ellipse', 'image'];
  const leftProperty = elementsByCoordinates.includes(window.data.move.nodeName) ? 'x' : 'left';
  const topProperty = elementsByCoordinates.includes(window.data.move.nodeName) ? 'y' : 'top';

  window.data.move.style.transform = transform;
  window.data.move.style[leftProperty] = left;
  window.data.move.style[topProperty] = top;
}
