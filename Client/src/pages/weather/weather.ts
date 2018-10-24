import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-weather-tab',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  constructor(
    public navCtrl: NavController,
    public locationService: LocationService
  ) {}
}
