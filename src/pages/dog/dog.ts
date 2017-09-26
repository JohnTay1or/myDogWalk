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
    //console.log('ngOnInit');
    //console.log(this.dogsService.favoriteDogs);
    //console.log(this.dog);
  }

  //ionViewWillEnter() {
    //this.dog = this.navParams.data;
    //console.log('ionViewWillEnter');
    //console.log(this.dogsService.favoriteDogs);
    //console.log(this.dog);
  //}

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
            loading.present();
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
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.dogsService.getFavoriteDogs(token)
            .subscribe(
              (data) => {
                //console.log(data);
                for (const key of Object.keys(data)) {
                  //console.log(key);
                  //console.log(data[key]);
                  //data[key].id = key.substring(1);
                  //console.log(data[key]);
                  //this.dogsCollection.push(data[key]);
                  //console.log(dog);
                  //console.log(data[key].dogId === dog.id)
                  if (data[key].dogId === dog.id) {
                    //console.log(key);
                    this.dogsService.removeDogFromFavorites(token, key)
                      .subscribe(
                        (data) => {
                          //console.log('Here ' + data);
                          //loading.dismiss();
                        },
                        error => {
                          //loading.dismiss();
                          this.handleError(error.json().error);
                        }
                      );
                  }
                }
                loading.dismiss();
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
    //this.dogsService.removeDogFromFavorites(token, dog);
  }

  isFavorite(dog: Dog) {
    //console.log(dog);
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
