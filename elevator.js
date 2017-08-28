const moment = require('moment');

export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
    this.totalStopsMade = 0;
    this.totalRequestsProcessed = 0;
    this.currentHour = Date.now();
  }

  reset() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
    this.totalStopsMade = 0;
    this.totalRequestsProcessed = 0;
    this.currentHour = Date.now();
  }

  riderRequest(person) {
    this.currentRequests.push(person);
  }

  processRequests() {
    this.currentRequests.map(rider => this.goToFloor(rider));
  }

  goToFloor(person) {
    this.updateFloorsTraversed(this.currentFloor, person.currentFloor);
    this.updateStopsMade();
    this.currentRiders.push(person);
    this.currentRequests = this.currentRequests.filter(rider => rider.name !== person.name);
    this.currentFloor = person.dropOffFloor;
    this.currentRiders = this.currentRiders.filter(rider => rider.name !== person.name);
    this.updateFloorsTraversed(person.currentFloor, person.dropOffFloor);
    this.updateDirection(person.currentFloor, person.dropOffFloor);
    this.updateStopsMade();
    this.updateRequestsProcessed();
    // this.processEnd();
  }

  processEnd() {
    if (moment(this.currentTime).hour() < 12) {
      if (!this.currentRequests.length && !this.currentRiders.length) {
        this.updateFloorsTraversed(this.currentFloor, 0);
        this.currentFloor = 0;
      }
    }
  }

  updateFloorsTraversed(start, end) {
    this.floorsTraversed += Math.abs(start - end);
  }

  updateStopsMade() {
    this.totalStopsMade += 1;
  }

  updateDirection(start, end) {
    this.travelDirection = start > end ? 'down' : 'up';
    if (this.currentFloor === 0) this.travelDirection = 'up';
  }

  updateRequestsProcessed() {
    this.totalRequestsProcessed += 1;
  }
}
