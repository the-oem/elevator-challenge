/* global describe */
/* global beforeEach */
/* global it */


require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/,
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Person', () => {
  it('should have initial properties when created', () => {
    const mockPerson = new Person({ name: 'Robbie', currentFloor: 2, dropOffFloor: 4 });
    assert.equal(mockPerson.name, 'Robbie');
    assert.equal(mockPerson.currentFloor, 2);
    assert.equal(mockPerson.dropOffFloor, 4);
  });
});

describe('Elevator', () => {
  const elevator = new Elevator();

  beforeEach(() => {
    elevator.reset();
  });

  it('should have default properties', () => {
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.currentRiders.length, 0);
    assert.equal(elevator.currentRequests.length, 0);
    assert.equal(elevator.travelDirection, 'up');
    assert.equal(elevator.floorsTraversed, 0);
    assert.equal(elevator.totalStopsMade, 0);
  });

  it('should be able to be reset', () => {
    elevator.currentFloor = 8;
    elevator.currentRiders.push({});
    elevator.currentRequests.push(3);
    elevator.travelDirection = 'down';
    elevator.floorsTraversed = 12;
    elevator.totalStopsMade = 24;
    elevator.reset();
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.currentRiders.length, 0);
    assert.equal(elevator.currentRequests.length, 0);
    assert.equal(elevator.travelDirection, 'up');
    assert.equal(elevator.floorsTraversed, 0);
    assert.equal(elevator.totalStopsMade, 0);
  });

  it('should update floors traversed', () => {
    assert.equal(elevator.floorsTraversed, 0);
    elevator.updateFloorsTraversed(3, 8);
    assert.equal(elevator.floorsTraversed, 5);
    elevator.updateFloorsTraversed(4, 3);
    assert.equal(elevator.floorsTraversed, 6);
  });

  it('should track stops made', () => {
    assert.equal(elevator.totalStopsMade, 0);
    elevator.updateStopsMade();
    assert.equal(elevator.totalStopsMade, 1);
    elevator.updateStopsMade();
    assert.equal(elevator.totalStopsMade, 2);
  });

  describe('Level 1 - Level 2', () => {
    it('should bring a rider to a floor above their current floor', () => {
      const mockUser = new Person({ name: 'Brittany', currentFloor: 2, dropOffFloor: 5 });
      elevator.goToFloor(mockUser);
      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.floorsTraversed, 3);
    });

    it('should bring a rider to a floor below their current floor', () => {
      const mockUser = new Person({ name: 'Brittany', currentFloor: 8, dropOffFloor: 3 });
      elevator.goToFloor(mockUser);
      assert.equal(elevator.currentFloor, 3);
      assert.equal(elevator.floorsTraversed, 5);
    });
  });
});
