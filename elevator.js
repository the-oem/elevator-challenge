export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
    this.totalStopsMade = 0;
  }

  reset() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
    this.totalStopsMade = 0;
  }

  goToFloor(rider) {
    this.currentRiders.push(rider);
    this.currentFloor = rider.dropOffFloor;
    this.updateFloorsTraversed(rider.currentFloor, rider.dropOffFloor);
    this.updateStopsMade();
  }

  updateFloorsTraversed(start, end) {
    const traversed = Math.abs(start - end);
    this.floorsTraversed += traversed;
  }

  updateStopsMade() {
    this.totalStopsMade += 1;
  }
}
