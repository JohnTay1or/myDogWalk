import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { FavoritesPage } from '../favorites/favorites';
import { DogsPage } from '../dogs/dogs';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  //tab1Root = HomePage;
  tab1Root = FavoritesPage;
  tab2Root = DogsPage;
  tab3Root = ProfilePage;
  tab4Root = AboutPage;
  tab5Root = ContactPage;


  constructor() {

  }

  ionViewDidEnter() {
    this.tabRef.select(4);
  }

  switchPage(id) {
    this.tabRef.select(id);
  }
}
