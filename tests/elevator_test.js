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
    assert.equal(elevator.totalRequestsProcessed, 0);
  });

  it('should be able to be reset', () => {
    elevator.currentFloor = 8;
    elevator.currentRiders.push({});
    elevator.currentRequests.push(3);
    elevator.travelDirection = 'down';
    elevator.floorsTraversed = 12;
    elevator.totalStopsMade = 24;
    elevator.totalRequestsProcessed = 18;
    elevator.reset();
    assert.equal(elevator.currentFloor, 0);
    assert.equal(elevator.currentRiders.length, 0);
    assert.equal(elevator.currentRequests.length, 0);
    assert.equal(elevator.travelDirection, 'up');
    assert.equal(elevator.floorsTraversed, 0);
    assert.equal(elevator.totalStopsMade, 0);
    assert.equal(elevator.totalRequestsProcessed, 0);
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

  it('should track its direction', () => {
    assert.equal(elevator.travelDirection, 'up');
    elevator.currentFloor = 2;
    elevator.updateDirection(5, 2);
    assert.equal(elevator.travelDirection, 'down');
    elevator.currentFloor = 10;
    elevator.updateDirection(2, 10);
    assert.equal(elevator.travelDirection, 'up');
    elevator.currentFloor = 0;
    elevator.updateDirection(10, 0);
    assert.equal(elevator.travelDirection, 'up');
  });

  it('should track its requests', () => {
    assert.equal(elevator.currentRequests.length, 0);
    elevator.riderRequest(new Person({ name: 'Brittany', currentFloor: 2, dropOffFloor: 5 }));
    assert.equal(elevator.currentRequests.length, 1);
    elevator.riderRequest(new Person({ name: 'Robbie', currentFloor: 4, dropOffFloor: 10 }));
    assert.equal(elevator.currentRequests.length, 2);
  });

  it('should update the total requests its processed', () => {
    assert.equal(elevator.totalRequestsProcessed, 0);
    elevator.updateRequestsProcessed();
    assert.equal(elevator.totalRequestsProcessed, 1);
    elevator.updateRequestsProcessed();
    assert.equal(elevator.totalRequestsProcessed, 2);
  });

  describe('Level 1 - Level 3', () => {
    it('should bring a rider to a floor above their current floor', () => {
      const mockPerson = new Person({ name: 'Brittany', currentFloor: 2, dropOffFloor: 5 });

      elevator.riderRequest(mockPerson);
      elevator.processRequests();

      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.floorsTraversed, 5);
    });

    it('should bring a rider to a floor below their current floor', () => {
      const mockPerson = new Person({ name: 'Brittany', currentFloor: 8, dropOffFloor: 3 });

      elevator.riderRequest(mockPerson);
      elevator.processRequests();

      assert.equal(elevator.currentFloor, 3);
      assert.equal(elevator.floorsTraversed, 13);
    });
  });

  describe('Level 4', () => {
    it('should pick up Bob and deliver him, then pick up Sue and deliver her', () => {
      const mockPerson1 = new Person({ name: 'Bob', currentFloor: 3, dropOffFloor: 2 });
      const mockPerson2 = new Person({ name: 'Sue', currentFloor: 6, dropOffFloor: 5 });

      elevator.riderRequest(mockPerson1);
      elevator.riderRequest(mockPerson2);

      assert.equal(elevator.currentRequests.length, 2);
      assert.equal(elevator.currentFloor, 0);

      elevator.processRequests();

      assert.equal(elevator.currentRiders.length, 0);
      assert.equal(elevator.currentRequests.length, 0);
      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.totalStopsMade, 4);
      assert.equal(elevator.travelDirection, 'down');
      assert.equal(elevator.floorsTraversed, 9);
    });
  });

  describe('Level 5', () => {
    it('should process person A going up and person B going up', () => {
      const mockPerson1 = new Person({ name: 'Bob', currentFloor: 3, dropOffFloor: 6 });
      const mockPerson2 = new Person({ name: 'Sue', currentFloor: 2, dropOffFloor: 10 });

      elevator.riderRequest(mockPerson1);
      elevator.riderRequest(mockPerson2);

      assert.equal(elevator.currentRequests.length, 2);
      assert.equal(elevator.currentFloor, 0);

      elevator.processRequests();

      assert.equal(elevator.currentRiders.length, 0);
      assert.equal(elevator.currentRequests.length, 0);
      assert.equal(elevator.currentFloor, 10);
      assert.equal(elevator.totalStopsMade, 4);
      assert.equal(elevator.travelDirection, 'up');
      assert.equal(elevator.floorsTraversed, 18);
      assert.equal(elevator.totalRequestsProcessed, 2);
    });

    it('should process person A going up and person B going down', () => {
      const mockPerson1 = new Person({ name: 'Bob', currentFloor: 1, dropOffFloor: 6 });
      const mockPerson2 = new Person({ name: 'Sue', currentFloor: 7, dropOffFloor: 5 });

      elevator.riderRequest(mockPerson1);
      elevator.riderRequest(mockPerson2);

      assert.equal(elevator.currentRequests.length, 2);
      assert.equal(elevator.currentFloor, 0);

      elevator.processRequests();

      assert.equal(elevator.currentRiders.length, 0);
      assert.equal(elevator.currentRequests.length, 0);
      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.totalStopsMade, 4);
      assert.equal(elevator.travelDirection, 'down');
      assert.equal(elevator.floorsTraversed, 9);
      assert.equal(elevator.totalRequestsProcessed, 2);
    });

    it('should process person A going down and person B going up', () => {
      const mockPerson1 = new Person({ name: 'Bob', currentFloor: 7, dropOffFloor: 2 });
      const mockPerson2 = new Person({ name: 'Sue', currentFloor: 6, dropOffFloor: 11 });

      elevator.riderRequest(mockPerson1);
      elevator.riderRequest(mockPerson2);

      assert.equal(elevator.currentRequests.length, 2);
      assert.equal(elevator.currentFloor, 0);

      elevator.processRequests();

      assert.equal(elevator.currentRiders.length, 0);
      assert.equal(elevator.currentRequests.length, 0);
      assert.equal(elevator.currentFloor, 11);
      assert.equal(elevator.totalStopsMade, 4);
      assert.equal(elevator.travelDirection, 'up');
      assert.equal(elevator.floorsTraversed, 21);
      assert.equal(elevator.totalRequestsProcessed, 2);
    });

    it('should process person A going down and person B going down', () => {
      const mockPerson1 = new Person({ name: 'Bob', currentFloor: 10, dropOffFloor: 2 });
      const mockPerson2 = new Person({ name: 'Sue', currentFloor: 6, dropOffFloor: 5 });

      elevator.riderRequest(mockPerson1);
      elevator.riderRequest(mockPerson2);

      assert.equal(elevator.currentRequests.length, 2);
      assert.equal(elevator.currentFloor, 0);

      elevator.processRequests();

      assert.equal(elevator.currentRiders.length, 0);
      assert.equal(elevator.currentRequests.length, 0);
      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.totalStopsMade, 4);
      assert.equal(elevator.travelDirection, 'down');
      assert.equal(elevator.floorsTraversed, 23);
      assert.equal(elevator.totalRequestsProcessed, 2);
    });
  });
});
