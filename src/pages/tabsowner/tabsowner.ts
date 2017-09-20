//import { Component, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
//import { Tabs } from 'ionic-angular';

import { NewDogPage } from '../new-dog/new-dog';
import { DogsPage } from '../dogs/dogs';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';


@Component({
  templateUrl: 'tabsowner.html'
})
export class TabsOwnerPage {

  //@ViewChild('myTabs') tabRef: Tabs;

  //tab1Root = HomePage;
  tab1Root = ProfilePage;
  tab2Root = NewDogPage;
  tab3Root = DogsPage;
  tab4Root = AboutPage;
  tab5Root = ContactPage;

  /*ionViewDidEnter() {
    this.tabRef.select(2);
  }*/

  constructor() {
  }
}
