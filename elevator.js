export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
  }

  reset() {
    this.currentFloor = 0;
    this.currentRiders = [];
    this.currentRequests = [];
  }

  goToFloor(rider) {
    this.currentRiders.push(rider);
    this.currentFloor = rider.dropOffFloor;
  }
}
