import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-tabsprofile',
  templateUrl: 'tabsprofile.html'
})
export class TabsProfilePage {

  tab1Root = ProfilePage;

  constructor() {
  }
}
