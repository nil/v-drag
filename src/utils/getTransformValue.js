// Return element's left or top position
export default function (str, dir) {
  // Get top or left position, without translate
  let pos = Number(window.getComputedStyle(window.data.move)[dir].replace('px', ''));

  // Only consider translation when matrix is defined
  if (str !== 'none') {
    // Get all matrix's values
    const itemsArray = str.match(/[0-9.-]+/g);

    // Get matrix translate value, based on the x + y = 8 equation
    pos += Number(itemsArray[8 - dir.length]);
  }

  return pos;
}
