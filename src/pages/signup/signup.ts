import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor (private authService: AuthService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController) {
  }
  
  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        //console.log(data);
        //const userId = this.authService.getActiveUser().uid;
        const userType = form.value.userType;
        //console.log(userId);
        console.log(userType);
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              //console.log(token);
              this.authService.defineUser(token, userType)
                .subscribe(
                  () => loading.dismiss(),
                  error => {
                    console.log('Am I here')
                    loading.dismiss();
                    this.handleError(error.json().error);
                  }
                );
            }
          );  
        //loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
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
