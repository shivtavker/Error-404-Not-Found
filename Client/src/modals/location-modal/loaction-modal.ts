import { Component, NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { LocationService } from '../../services/location.service';

declare var google;

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.html',
})
export class LocationModal {
  autocomplete;
  autocompleteItems;
  GoogleAutocomplete;
  geocoder;
  constructor(
    public viewCtrl: ViewController,
    public zone: NgZone,
    public locationService: LocationService,
    public geolocation: Geolocation
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    // prettier-ignore-next-statement
    this.geocoder = new google.maps.Geocoder();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  selectSearchResult(result) {
    this.geocoder.geocode({ placeId: result.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        this.updateLocation(position);
      }
    });
  }

  updateLocation(position) {
    this.locationService.updateLocation(position);
    this.locationService.updateSafePlace(position);
    this.dismiss();
  }

  getCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(location => {
        let position = {
          lat: location['coords']['latitude'],
          lng: location['coords']['longitude'],
        };
        console.log(position);
        this.updateLocation(position);
      })
      .catch(err => {
        alert({ msg: 'Error getting Current Location', error: err });
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
