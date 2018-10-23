import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-tab-navigation',
  templateUrl: 'navigate.html',
})
export class NavigatePage {
  constructor(public navCtrl: NavController) {}
}
