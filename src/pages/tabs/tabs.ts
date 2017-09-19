import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { FavoritesPage } from '../favorites/favorites';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import { DogsPage } from '../dogs/dogs';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  //tab1Root = HomePage;
  tab1Root = FavoritesPage;
  tab2Root = DogsPage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;


  constructor() {

  }

  ionViewDidEnter() {
    this.tabRef.select(4);
  }

  switchPage(id) {
    this.tabRef.select(id);
  }
}
