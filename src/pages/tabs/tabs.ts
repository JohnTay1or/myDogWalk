import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { DogsPage } from '../dogs/dogs';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavoritesPage;
  tab2Root = DogsPage;
  tab3Root = ProfilePage;
  tab4Root = AboutPage;
  tab5Root = ContactPage;


  constructor() {
  }
}
