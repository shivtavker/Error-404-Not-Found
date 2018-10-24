import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../services/location.service';

declare var google;

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
    console.log('Google Api call');
    this.loadMap();
    if (!this.locationService.atSafePlace) this.startNavigating();
  }

  loadMap() {
    let mapOptions = {
      center: this.locationService.location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      scaleControl: false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  startNavigating() {
    // let safe_marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: this.locationService.safePlace,
    // });

    // let curr_marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: this.locationService.location,
    // });

    // safe_marker.setIcon(
    //   'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    // );

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer({
      preserveViewport: true,
    });

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
