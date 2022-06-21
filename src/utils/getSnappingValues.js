// Return object even if it's a string (with or without units),
// set 'force' to true to never return an undefined value
function toNumber(input, force) {
  const value = typeof input === 'string' ? parseInt(input.replace(/px/g, ''), 10) : input;
  return (value === 0 || Number.isNaN(value) || (force && value === undefined)) ? 1 : value;
}

// Return many options to an object with x and y values
export default function (value) {
  // If value is given as a string, eg. '20px'
  if (typeof value === 'string') {
    const valueArray = value.split(',');

    return {
      x: toNumber(valueArray[0]),
      y: toNumber(valueArray[1]) !== undefined ? toNumber(valueArray[1]) : toNumber(valueArray[0]),
    };
  }

  // If value is given as a number, eg. 20
  if (typeof value === 'number') {
    return {
      x: toNumber(value),
      y: toNumber(value),
    };
  }

  // If value is given as an object, eg. {x: 20, y: 10}
  if (value instanceof Object && (value.x || value.y)) {
    return {
      x: toNumber(value.x) || 1,
      y: toNumber(value.y) || 1,
    };
  }

  // If value is given as an array, eg. [20, 10]
  if (Array.isArray(value)) {
    return {
      x: toNumber(value[0]) || 1,
      y: toNumber(value[1]) !== undefined ? toNumber(value[1], true) : toNumber(value[0], true),
    };
  }

  return {
    x: 1,
    y: 1,
  };
}
