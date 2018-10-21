import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Position {
  Lat: number;
  Lng: number;
}

interface Weather {
  alert: string;
  precipint: number;
  flood: Boolean;
  Lat: number;
  Lng: number;
}

var DomainUrl = 'http://localhost:3000/api/';

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

  locationWeather: Weather;
  locationWeatherAvailable = false;

  constructor(private httpClient: HttpClient) {}

  updateLocation(position: Position) {
    this.location = position;
    this.locationWeatherAvailable = false;
    this.getLocationWeather(this.location);
  }
  updateSafePlace(position: Position) {
    this.safePlace = position;
  }

  getLocationWeather(location: Position) {
    let queryUrl =
      DomainUrl + `mldata/?location=${location.Lat},${location.Lng}`;

    this.httpClient.get(queryUrl).subscribe(weathers => {
      weathers.forEach(weather => {
        if (weather.Lat == location.Lat && weather.Lng == location.Lng) {
          this.locationWeather = weather;
          this.locationWeatherAvailable = true;
        }
      });

      if (this.locationWeather.flood) {
        weathers.forEach(weather => {
          if (!weather.flood) {
            this.safePlace = {
              Lat: weather.Lat,
              Lng: weather.Lng,
            };
          }
        });
      }
    });
  }
}
