export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
  }

  reset() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
    this.travelDirection = 'up';
    this.floorsTraversed = 0;
  }

  pickUpRider(rider) {
    this.currentRiders.push(rider);
    this.currentFloor = rider.currentFloor;
    this.currentRequests.push(rider.dropOffFloor);
  }

  goToFloor(rider) {
    this.currentRiders.push(rider);
    this.currentFloor = rider.dropOffFloor;
  }
}
