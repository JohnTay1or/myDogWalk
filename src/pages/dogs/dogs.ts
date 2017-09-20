//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { LoadingController, AlertController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { Dog } from "../../data/dog.interface";
//import dogs from "../../data/dogs";
import { DogsService} from "../../services/dogs"
import { AuthService } from "../../services/auth";
import { DogPage } from "../dog/dog"

@Component({
  selector: 'page-dogs',
  templateUrl: 'dogs.html',
})
//export class DogsPage implements OnInit {
export class DogsPage {
  dogsCollection: Dog[];
  dogPage = DogPage;

  constructor(
    //private navParams: NavParams,
    private alertCtrl: AlertController,
    private dogsService: DogsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  //ngOnInit() {
  //  this.dogsCollection = this.dogsService.getDogs();
    //console.log(this.dogsCollection)
  //}

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.dogsService.getDogs(token)
            .subscribe(
              (data) => {
                //console.log('I am intested in what we get back');
                //console.log(data);
                this.dogsCollection = []
                if (data) {
                  for (const key of Object.keys(data)) {
                    //console.log(key, data[key]);
                    this.dogsCollection.push(data[key]);
                  }
                }  
                //this.dogsCollection = []
                //this.dogsCollection.push(data);
                loading.dismiss()
                },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
    //this.dogsCollection = this.dogsService.getDogs();
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
            this.dogsService.addDogToFavorites(selectedDog);
          }
        },
        {
          text: 'No, I changed my mind',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!')
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

}
