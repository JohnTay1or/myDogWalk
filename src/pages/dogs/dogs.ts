//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { Dog } from "../../data/dog.interface";
//import dogs from "../../data/dogs";
import { DogsService} from "../../services/dogs"
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
  ) {}
  
  //ngOnInit() {
  //  this.dogsCollection = this.dogsService.getDogs();
    //console.log(this.dogsCollection)
  //}
  
  ionViewWillEnter() {
    this.dogsCollection = this.dogsService.getDogs();
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
}
