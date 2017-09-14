import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { Dog } from "../data/dog.interface";
import { AuthService } from "./auth";

@Injectable()
export class DogsService {
    private favoriteDogs: Dog[] = [];
    //private dogs: Dog[] = [];
    
    constructor(private authService: AuthService,
                private http: Http) {}
    
    addDogToFavorites(dog: Dog) {
        //console.log(dog);
        this.favoriteDogs.push(dog);
        //console.log(this.favoriteDogs);
    }
    
    removeDogFromFavorites(dog: Dog) {
        const position = this.favoriteDogs.findIndex((dogEl: Dog) => {
            return dogEl.id == dog.id;
        });
        this.favoriteDogs.splice(position, 1);
    }
    
    getFavoriteDogs() {
        return this.favoriteDogs.slice();
    }
    
    isDogFavorite(dog: Dog) {
        return this.favoriteDogs.find((dogEl: Dog) => {
            return dogEl.id == dog.id
        })
    } 
    
    addDog(token: string, dog: Dog) {
        //this.dogs.push(dog);
        const userId = this.authService.getActiveUser().uid;
        dog['owner'] = userId;
        return this.http
            .post('https://mydogwalk-ad2f0.firebaseio.com/dogs.json?auth=' + token, dog)
            .map((response: Response) => {
                return response.json(); 
            });
    }
    
     getDogs(token: string) {
        //console.log(this.dogs);
        //return this.dogs.slice();
        //const userId = this.authService.getActiveUser().uid;
        return this.http
            .get('https://mydogwalk-ad2f0.firebaseio.com/dogs.json?auth=' + token)
            .map((response: Response) => {
                return response.json(); 
            })
            //.do((data) => {
                //console.log(data);
                //this.dogs = [];
            //    this.dogs.push(data);
            //    console.log(this.dogs);
            //})
            ;
    }
    
}