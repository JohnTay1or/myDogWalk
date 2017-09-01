import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDogPage } from './new-dog';

@NgModule({
  declarations: [
    NewDogPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDogPage),
  ],
})
export class NewDogPageModule {}
