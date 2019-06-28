import eventListener from '../src/utils/eventListener';

function testFunc() {
  return 'result';
}

describe('eventListener', () => {
  test('1...', () => {
    eventListener(['onclick'], testFunc);
  });
});
