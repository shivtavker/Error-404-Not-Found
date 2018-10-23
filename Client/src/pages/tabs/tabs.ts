import { Component } from '@angular/core';

import { NavigatePage } from '../navigate/navigate';
import { ContactPage } from '../contact/contact';
import { WeatherPage } from '../weather/weather';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = WeatherPage;
  tab2Root = NavigatePage;
  tab3Root = ContactPage;

  constructor() {}
}
