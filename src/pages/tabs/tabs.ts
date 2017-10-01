import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
//import { DogsPage } from '../dogs/dogs';
import { FindDogPage } from '../find-dog/find-dog'
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavoritesPage;
  tab2Root = FindDogPage;
  tab3Root = EditProfilePage;
  tab4Root = AboutPage;
  tab5Root = ContactPage;


  constructor() {
  }
}
