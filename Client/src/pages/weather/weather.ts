import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-weather-tab',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  constructor(public navCtrl: NavController) {}
}
