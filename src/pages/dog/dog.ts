import { Component, OnInit } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Dog } from "../../data/dog.interface";
//import dogs from "../../data/dogs";
import { DogsService} from "../../services/dogs"

@Component({
  selector: 'page-dog',
  templateUrl: 'dog.html',
})
export class DogPage implements OnInit {
  dog: Dog;
  
  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private dogsService: DogsService,
  ) {}
  
  ngOnInit() {
    this.dog = this.navParams.data;
    console.log(this.dog);
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
