import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { WeatherPage } from '../weather/weather';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = WeatherPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {}
}
