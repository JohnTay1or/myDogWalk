import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import { DogsPage } from '../dogs/dogs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //tab1Root = HomePage;
  tab1Root = FavoritesPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = DogsPage;

  constructor() {

  }
}
