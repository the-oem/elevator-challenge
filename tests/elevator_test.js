/* global describe */
/* global beforeEach */
/* global it */


require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/,
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Elevator', () => {
  const elevator = new Elevator();

  beforeEach(() => {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    const mockUser = new Person({ name: 'Brittany', currentFloor: 2, dropOffFloor: 5 });
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    const mockUser = new Person({ name: 'Brittany', currentFloor: 8, dropOffFloor: 3 });
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
  });
});
