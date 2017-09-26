import { Component } from '@angular/core';

import { LoadingController, AlertController } from 'ionic-angular';

import { Dog } from "../../data/dog.interface";
import { DogsService } from "../../services/dogs";
import { AuthService } from "../../services/auth";

//import { DogPage} from "../quote/quote";
//import { SettingsService } from "../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  //dogs: Dog[] = [];

  constructor (private dogsService: DogsService,
               private loadingCtrl: LoadingController,
               private authService: AuthService,
               private alertCtrl: AlertController//,
               //private modalCtrl: ModalController,
               //private settingsService: SettingsService
  ) {}

  ionViewWillEnter() {
    //this.dogsService.favoriteDogs;
    //this.dogs = this.dogsService.getFavoriteDogsLocal();
    /*const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.dogsService.getFavoriteDogs(token)
            .subscribe(
              (data) => {
                console.log(data);
                if (data) {
                  this.dogsService.favoriteDogs = [];
                  console.log(this.dogsService.favoriteDogs)
                  //this.dogs = [];
                //console.log(data);
                  for (const key of Object.keys(data)) {
                    //console.log(key);
                    //console.log(data[key].dogId)
                    this.dogsService.getDog(token, '-'+data[key].dogId)
                      .subscribe(
                        (data) => {
                          console.log(data);
                          this.dogsService.favoriteDogs.push(data);
                          console.log(this.dogsService.favoriteDogs)
                          //this.dogs = this.dogsService.getFavoriteDogsLocal();
                          //console.log(this.dogs);
                          //console.log(data);
                          //this.dogs.push(data);
                        },
                        error => {
                          this.handleError(error.json().error);
                        }
                      );
                  }
                }
                //this.dogs = this.dogsService.getFavoriteDogsLocal();
                //console.log(this.dogs);
                loading.dismiss();
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );*/
  }

  /*onRemoveFromFavorites(dog: Dog) {
    //this.dogsService.removeDogFromFavorites(dog);
    //this.quotes = this.quotesService.getFavoriteQuotes();
    console.log(dog);
    console.log(this.dogs);
    const position = this.dogs.findIndex((dogEl: Dog) => {
      return dogEl.id == dog.id;
    })
    this.dogs.splice(position, 1);
  }*/

  onRemoveFromFavorites(dog: Dog) {
    //console.log('Am I here');
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
                //console.log('what about here');
                //console.log(data);
                for (const key of Object.keys(data)) {
                  //console.log('Here');
                  //console.log(dog.id);
                  //console.log(data[key].dogId);
                  if (data[key].dogId === dog.id) {
                    this.dogsService.removeDogFromFavorites(token, key)
                      .subscribe(
                        (data) => {
                          //console.log('Here');
                          //this.dogs = this.dogsService.getFavoriteDogsLocal();
                        },
                        error => {
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
  }

  imageId() {
    return 1;
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
