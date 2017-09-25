import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Dog } from "../../data/dog.interface";
//import dogs from "../../data/dogs";
import { DogsService } from "../../services/dogs";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-dog',
  templateUrl: 'dog.html',
})
export class DogPage implements OnInit {
  dog: Dog;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private dogsService: DogsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dog = this.navParams.data;
    //console.log(this.dog);
  }

  //ionViewDidLoad() {
  //  this.quoteGroup = this.navParams.data;
  // Add elvis operator (?) in template to use this approach
  //}

  onAddToFavorites(selectedDog: Dog) {
    const alert = this.alertCtrl.create({
      title: 'Add Dog',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to walk this dog',
      buttons: [
        {
          text: 'Yes, I love him',
          handler: () => {
            //this.dogsService.addDogToFavorites(selectedDog);


            const loading = this.loadingCtrl.create({
              content: 'Please wait...'
            })
            //const imgId = Math.floor(Math.random() * (5 - 1)) + 1;
            /*const dog = {
              owner: 'tba',
              id: imgId.toString(),
              name: form.value.name,
              breed: form.value.breed,
              icon: 'icon',
              sex: form.value.sex,
              age: form.value.age,
              energy: form.value.energy,
              size: form.value.size
            };*/
            this.authService.getActiveUser().getToken()
              .then(
                (token: string) => {
                  this.dogsService.addDogToFavorites(token, selectedDog)
                    .subscribe(
                      () => {
                        loading.dismiss();
                      },
                      error => {
                        loading.dismiss();
                        this.handleError(error.json().error);
                      }
                    );
                }
              );
          }
        },
        {
          text: 'No, I changed my mind',
          role: 'cancel',
          handler: () => {
            //console.log('Cancelled!')
          }
        }
      ]
    })
    alert.present();
  }

  onRemoveFromFavorites(dog: Dog) {
    this.dogsService.removeDogFromFavorites(dog);
  }

  isFavorite(dog: Dog) {
    return this.dogsService.isDogFavorite(dog);
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  imageId() {
    return 1;
  }
}
