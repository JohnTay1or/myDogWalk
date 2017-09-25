import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, Events } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { ProfileService } from '../../services/profile';

import { Profile } from "../../data/profile.interface";

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  profile: Profile = {userId: null, email: null, userType: null};

  constructor (private authService: AuthService,
               private profileService: ProfileService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               public events: Events) {
  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Saving your profile...'
    });
    loading.present();
    //:const userId = this.authService.getActiveUser().uid;
    const userType = form.value.userType;
    //console.log(userId);
    //console.log(userType);
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.authService.defineUser(token, userType)
            .subscribe(
              () => {
                loading.dismiss();
                this.events.publish('user:savedProfile');
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
  }

  ionViewWillEnter() {
    this.profile = this.profileService.profile;
    /*const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.profileService.getProfile(token)
            .subscribe(
              (data) => {
                this.profile = data;
                loading.dismiss();
                //console.log(this.profile);
                },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );*/
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
