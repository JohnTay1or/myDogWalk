import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
//import { NavController } from 'ionic-angular';
//import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';

import { DogsService } from "../../services/dogs";
import { AuthService } from "../../services/auth";

//@IonicPage()
@Component({
  selector: 'page-new-dog',
  templateUrl: 'new-dog.html',
})
export class NewDogPage {
  selectOptions = ['Male', 'Female']; 

  constructor(/*private navCtrl: NavController, */
              private dogsService: DogsService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad NewDogPage');
  //}
  
  onAddDog(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    }) 
    const dog = {
      id: '5', 
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
              () => loading.dismiss(),
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
    );  
    //this.dogsService.addDog({
    //  id: '5', 
    //  name: form.value.name, 
    //  breed: form.value.breed, 
    //  icon: 'icon', 
    //  sex: form.value.sex, 
    //  age: form.value.age, 
    //  energy: form.value.energy,
    //  size: form.value.size
    //});
    form.reset();
    //this.navCtrl.parent.select(3);
    //this.navCtrl.popToRoot();
    //this.loadItems();
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
