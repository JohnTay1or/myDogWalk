import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor (private authService: AuthService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController) {
  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    const userId = this.authService.getActiveUser().uid;
    const userType = form.value.userType;
    //console.log(userId);
    //console.log(userType);
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.authService.defineUser(token, userType)
            .subscribe(
              () => loading.dismiss(),
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
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
