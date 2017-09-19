import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { DogsPage } from '../dogs/dogs';
import { NewDogPage } from '../new-dog/new-dog';

@Component({
  templateUrl: 'tabsowner.html'
})
export class TabsOwnerPage {

  //tab1Root = HomePage;
  tab1Root = NewDogPage;
  tab2Root = DogsPage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;

  constructor() {
  }
}
