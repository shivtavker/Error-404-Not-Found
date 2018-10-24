import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

interface Position {
  lat: number;
  lng: number;
}

interface Weather {
  alert: string;
  precipint: number;
  flood: Boolean;
  lat: number;
  lng: number;
  temp: number;
  humidity: number;
}

var DomainUrl = 'http://localhost:3000/api/';

@Injectable()
export class LocationService {
  location = {
    lat: 0,
    lng: 0,
  };
  safePlace = {
    lat: 0,
    lng: 0,
  };

  locationWeather: Weather;
  locationWeatherAvailable = false;
  loading;
  atSafePlace = true;
  everywhereFlood = false;
  address;

  constructor(
    private httpClient: HttpClient,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...',
    });
  }

  updateLocation(position: Position, address) {
    this.location = position;
    this.address = address;
    this.locationWeatherAvailable = false;
    this.loading.present();
    this.getLocationWeather(this.location);
  }
  updateSafePlace(position: Position) {
    this.safePlace = position;
  }

  getLocationWeather(location: Position) {
    let queryUrl =
      DomainUrl + `mldata/?location=${location.lat},${location.lng}`;

    this.httpClient.get(queryUrl).subscribe((weathers: Array<Weather>) => {
      weathers.forEach(weather => {
        if (weather.lat == location.lat && weather.lng == location.lng) {
          this.locationWeather = weather;
          console.log(this.locationWeather);
          this.locationWeatherAvailable = true;
        }
      });

      if (this.locationWeather.flood) {
        weathers.forEach(weather => {
          if (!weather.flood) {
            this.safePlace = {
              lat: weather.lat,
              lng: weather.lng,
            };
            this.atSafePlace = false;
          } else this.everywhereFlood = true;
        });
      }
      this.loading.dismiss();
    });
  }
  getSafePlace() {
    return this.atSafePlace;
  }
}
