import { Component, NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';

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
  constructor(public viewCtrl: ViewController, public zone: NgZone) {
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
        console.log(position);
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
