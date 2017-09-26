//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { LoadingController, AlertController } from 'ionic-angular';
import { Dog } from "../../data/dog.interface";
import { DogsService} from "../../services/dogs"
import { AuthService } from "../../services/auth";
import { ProfileService } from "../../services/profile";
import { Profile } from "../../data/profile.interface";

import { DogPage } from "../dog/dog"

@Component({
  selector: 'page-dogs',
  templateUrl: 'dogs.html',
})
//export class DogsPage implements OnInit {
export class DogsPage {
  dogsCollection: Dog[];
  dogPage = DogPage;
  profile: Profile;

  constructor(
    //private navParams: NavParams,
    private alertCtrl: AlertController,
    private dogsService: DogsService,
    private authService: AuthService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController
  ) {}

  //ngOnInit() {
  //  this.dogsCollection = this.dogsService.getDogs();
    //console.log(this.dogsCollection)
  //}

  ionViewWillEnter() {
    this.profile = this.profileService.profile;
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
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
                },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
  }

  onRemoveDog(selectedDog: Dog) {
    //console.log(selectedDog.id);
    //this.profile = this.profileService.profile;
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.dogsService.deleteDog(token, selectedDog.id)
            .subscribe(
              (data) => {
                //loading.dismiss(),
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
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
  }

  /*onAddToFavorites(selectedDog: Dog) {
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
  }*/

  isOwner() {
    return this.profileService.profile.userType === 'owner'
  }

  imageId() {
    return 1;
  }

  /*onRemoveFromFavorites(dog: Dog) {
    this.dogsService.removeDogFromFavorites(dog);
  }*/

  /*isFavorite(dog: Dog) {
    return this.dogsService.isDogFavorite(dog);
  }*/

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
