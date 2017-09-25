import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
//import { NavController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';

import { ContactService } from "../../services/contact";
import { AuthService } from "../../services/auth";
import { ProfileService } from '../../services/profile';

import { Profile } from "../../data/profile.interface";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  profile: Profile = {userId: null, email: null, userType: null};

  constructor(/*private navCtrl: NavController,*/
              private contactService: ContactService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private profileService: ProfileService) {
  }

  ionViewWillEnter() {
    this.profile = this.profileService.profile;
  }

  onContact(form: NgForm) {
    //console.log(this.profile);
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    const contact = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone,
      email: form.value.email,
      comment: form.value.comment
    };
    //console.log(contact);
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.contactService.addContact(token, contact)
            .subscribe(
              () => {
                //console.log('here');
                this.ack();
                loading.dismiss();
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
    form.reset();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  private ack() {
    const alert = this.alertCtrl.create({
      title: 'Message Sent',
      buttons: ['Ok']
    });
    alert.present();
  }
}
