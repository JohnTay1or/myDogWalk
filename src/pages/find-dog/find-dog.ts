import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavController } from 'ionic-angular';
//import { LoadingController, AlertController } from 'ionic-angular';

import { DogsPage } from '../dogs/dogs';

//import { DogsService } from "../../services/dogs";
//import { AuthService } from "../../services/auth";
//import { ProfileService } from "../../services/profile";

//import { Dog } from "../../data/dog.interface";
//import { Profile } from "../../data/profile.interface";

@Component({
  selector: 'page-find-dog',
  templateUrl: 'find-dog.html',
})
export class FindDogPage {
  //dogsCollection: Dog[];
  //profile: Profile;

  constructor(private navCtrl: NavController//,
              //private dogsService: DogsService,
              //private loadingCtrl: LoadingController,
              //private alertCtrl: AlertController,
              //private authService: AuthService,
              //private profileService: ProfileService
            ) {
  }

  onFindDog(form: NgForm) {
    const criteria = {
      fromAge: form.value.fromAge,
      toAge: form.value.toAge,
      sex: form.value.sex,
      energy: form.value.energy,
      size: form.value.size,
      breed: form.value.breed,
    }
    this.navCtrl.push(DogsPage, criteria);

    /*this.profile = this.profileService.profile;
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    console.log(form.value.fromAge);
    console.log(form.value.toAge);
    console.log(form.value.sex);
    console.log(form.value.energy);
    console.log(form.value.size);
    console.log(form.value.breed);


    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.dogsService.getDogs(token, this.profile.userType, this.profile.userId)
            .subscribe(
              (data) => {
                //console.log('I am intested in what we get back');
                //console.log(data);
                //console.log(this.isOwner());
                this.dogsCollection = []
                if (data) {
                  for (const key of Object.keys(data)) {
                    //console.log(key);
                    //console.log(data[key]);
                    data[key].id = key.substring(1);
                    //console.log(data[key]);
                    this.dogsCollection.push(data[key]);
                  }
                }
                loading.dismiss()
                console.log(this.dogsCollection);
                },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );


    form.reset();*/
  }

  /*private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }*/

}
