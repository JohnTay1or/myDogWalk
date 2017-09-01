import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavController } from 'ionic-angular';
import { DogsService } from "../../services/dogs";

//@IonicPage()
@Component({
  selector: 'page-new-dog',
  templateUrl: 'new-dog.html',
})
export class NewDogPage {
  selectOptions = ['Male', 'Female']; 

  constructor(private navCtrl: NavController, 
              private dogsService: DogsService) {
  }

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad NewDogPage');
  //}
  
  onAddDog(form: NgForm) {
    this.dogsService.addDog({
      id: '5', 
      name: form.value.name, 
      breed: form.value.breed, 
      icon: 'icon', 
      sex: form.value.sex, 
      age: form.value.age, 
      energy: form.value.energy,
      size: form.value.size
    });
    form.reset();
    this.navCtrl.parent.select(3);
    //this.navCtrl.popToRoot();
    //this.loadItems();
  }

}
