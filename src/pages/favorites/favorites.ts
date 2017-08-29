import { Component } from '@angular/core';

//import { ModalController } from 'ionic-angular';

import { Dog } from "../../data/dog.interface";
import { DogsService } from "../../services/dogs";
//import { DogPage} from "../quote/quote";
//import { SettingsService } from "../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  dogs: Dog[];
  
  constructor (private dogsService: DogsService,
               //private modalCtrl: ModalController,
               //private settingsService: SettingsService
  ) {}
  
  ionViewWillEnter() {
    this.dogs = this.dogsService.getFavoriteDogs(); 
  }
  
  /*onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    });
  }*/
  
  onRemoveFromFavorites(dog: Dog) {
    this.dogsService.removeDogFromFavorites(dog);
    //this.quotes = this.quotesService.getFavoriteQuotes();
    console.log(dog);
    console.log(this.dogs);
    const position = this.dogs.findIndex((dogEl: Dog) => {
      return dogEl.id == dog.id;
    })
    this.dogs.splice(position, 1);
  }
  
  //getBackground() {
    //return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  //}
  
  //isAltBackground() {
    //return this.settingsService.isAltBackground();
  //}
}
