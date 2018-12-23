// Checks if the given value is a valid axis value ('x', 'y' or 'all')
export default function (axis) {
  const acceptedValues = ['x', 'y', 'all'];

  if (acceptedValues.includes(axis)) {
    return true;
  }
  return false;
}
