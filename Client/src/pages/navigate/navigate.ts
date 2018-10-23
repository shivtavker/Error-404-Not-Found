import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-tab-navigation',
  templateUrl: 'navigate.html',
})
export class NavigatePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public locationService: LocationService
  ) {}

  ionViewDidLoad() {
    this.loadMap();
    // this.startNavigating();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(
      this.locationService.location.Lat,
      this.locationService.location.Lng
    );

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // let marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: this.map.getCenter(),
    // });
  }

  startNavigating() {
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route(
      {
        origin: this.locationService.location,
        destination: this.locationService.safePlace,
        travelMode: google.maps.TravelMode['DRIVING'],
      },
      (res, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(res);
        } else {
          console.warn(status);
        }
      }
    );
  }
}
