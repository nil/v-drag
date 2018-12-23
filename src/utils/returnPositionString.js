// Return a matrix with transform and translate values
export default function (matrix, a, b) {
  return `matrix(${matrix || '1, 0, 0, 1,'} ${a}, ${b})`;
}
