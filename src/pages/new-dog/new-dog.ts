import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';

import { DogsService } from "../../services/dogs";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-new-dog',
  templateUrl: 'new-dog.html',
})
export class NewDogPage {
  selectOptions = ['Male', 'Female'];

  constructor(private navCtrl: NavController,
              private dogsService: DogsService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }

  onAddDog(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    const imgId = Math.floor(Math.random() * (5 - 1)) + 1;
    const dog = {
      owner: 'tba',
      id: imgId.toString(),
      name: form.value.name,
      breed: form.value.breed,
      icon: 'icon',
      sex: form.value.sex,
      age: form.value.age,
      energy: form.value.energy,
      size: form.value.size
    };
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.dogsService.addDog(token, dog)
            .subscribe(
              () => {
                loading.dismiss();
                this.navCtrl.parent.select(0);
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
}
