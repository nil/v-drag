// Get the closest value posible when snaping on a grid
export default function (value, axis) {
  const snapValue = axis === 'x' ? window.data.snapX : window.data.snapY;
  return Math.round(value / snapValue) * snapValue;
}
