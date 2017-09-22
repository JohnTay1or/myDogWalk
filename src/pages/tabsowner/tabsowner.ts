import { Component } from '@angular/core';

import { NewDogPage } from '../new-dog/new-dog';
import { DogsPage } from '../dogs/dogs';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';


@Component({
  selector: 'page-tabowner',
  templateUrl: 'tabsowner.html'
})
export class TabsOwnerPage {

  tab1Root = DogsPage;
  tab2Root = NewDogPage;
  tab3Root = EditProfilePage;
  tab4Root = AboutPage;
  tab5Root = ContactPage;

  constructor() {
  }
}
