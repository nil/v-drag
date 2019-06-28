function check(n, a, b) {
  if (a !== b) {
    console.log(`${n}: ${a}, ${b}`);
  } else {
    console.log(`${n}: ${a}, ${b}`);
  }
}

function checkAxis(axis) {
  if (axis === 'x' || axis === 'y' || axis === 'all') {
    return axis;
  }
  return false;
}

function simplyAxis(axis) {
  if (checkAxis(axis)) {
    return axis
  } else {
    return 'all'
  }
}



// Axis
function axis(value) {
  const val = value.value;

  if (val instanceof Object && val.axis && checkAxis(val.axis)) {
    return val.axis;
  } else {
    return simplyAxis(value.arg)
  }
}

function getElm(id) {
  return document.getElementById(id);
}

// Handle
function handle(value, a) {
  const val = value.value;


  if (val instanceof Object) {
    if (val.handle) {
      if (getElm(val.handle)) {
        return true
      } else {
        return 'invalid'
      }
    } else {
      return false
    }
  } else if (val) {
    if (getElm(val)) {
      return true
    } else {
      return 'invalid'
    }
  } else {
    return false
  }

  // true: - val instanceof Object && val.handle && getElm(val.handle)
  //       - val && getElm(val)

  // false: - val instanceof Object && !val.handle
  //        - !val

  // invalid - val instanceof Object && val.handle && !getElm(val.handle)
  //         - val && !getElm(val)

  // if (
  //   (val instanceof Object && val.handle && getElm(val.handle)) ||
  //   (val && getElm(val))
  // ) {
  //   return true
  // } else {
  //   return false
  // }
}

check(1, true, handle({ value: { handle: 'validId' } })); // works!
check(2, false, handle({ value: { handle: '' } })); // works!
check(3, 'invalid', handle({ value: { handle: 'invalidId' } })); // works!
check(4, true, handle({ value: 'validId' })); // works!
check(5, false, handle({ value: '' })); // works!
check(6, 'invalid', handle({ value: 'invalidId' })); // works!
check(7, false, handle({}));

check('x', axis({ value: { axis: 'x' }, arg: 'y' })); // works!
check('all', axis({ value: { axis: 'all' }, arg: 'y' })); // works!
check('y', axis({ value: { axis: 'fall' }, arg: 'y' })); // works!
check('all', axis({ value: { axis: 'fall' }, arg: 'ya' })); // works!
check('y', axis({ value: { handle: 'id' }, arg: 'y' })); // works!
check('all', axis({ value: { handle: 'id' }, arg: 'ya' })); // works!
check('x', axis({ value: 'id', arg: 'x' })); // works!
check('all', axis({ value: 'id', arg: 'all' })); // works!
check('all', axis({ value: 'id', arg: 'fall' })); // works!
check('y', axis({ arg: 'y' })); // works!
check('all', axis({ expression: 'hey' })); // works!
check('all', axis({ arg: '' })); // works!
check('all', axis({ value: { axis: ''} })); // works!
