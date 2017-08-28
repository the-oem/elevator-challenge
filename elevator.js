export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
    this.totalStopsMade = 0;
    this.totalRequestsProcessed = 0;
  }

  reset() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
    this.totalStopsMade = 0;
    this.totalRequestsProcessed = 0;
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
