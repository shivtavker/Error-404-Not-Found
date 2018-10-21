import { Injectable } from '@angular/core';

interface Position {
  Lat: number;
  Lng: number;
}

@Injectable()
export class LocationService {
  location = {
    Lat: 0,
    Lng: 0,
  };
  safePlace = {
    Lat: 0,
    Lng: 0,
  };

  updateLocation(position: Position) {
    this.location = position;
  }
  updateSafePlace(position: Position) {
    this.safePlace = position;
  }
}
