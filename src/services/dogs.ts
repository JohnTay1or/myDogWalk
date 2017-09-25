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

    addDogToFavorites(token: string, dog: Dog) {
        //console.log(token)
        //console.log(dog.id);
        const userId = this.authService.getActiveUser().uid;
        //console.log(userId);
        //this.favoriteDogs.push(dog);
        //console.log(this.favoriteDogs);
        return this.http
            .post('https://mydogwalk-ad2f0.firebaseio.com/users/' + userId + '/favorites.json?auth=' + token, {id: dog.id})
            .map((response: Response) => {
                return response.json();
            });
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

    getDogs(token: string, userType, userId) {
        let url: string;
        if (userType === 'owner') {
          url = 'https://mydogwalk-ad2f0.firebaseio.com/dogs.json?auth=' + token + '&orderBy="owner"&equalTo="' + userId + '"';
          //console.log(url);
        } else {
          //console.log(userType);
          //console.log(userId);
          url = 'https://mydogwalk-ad2f0.firebaseio.com/dogs.json?auth=' + token;
        }
        return this.http
            .get(url)
            .map((response: Response) => {
                //console.log(response.json);
                return response.json();
            });
    }

    deleteDog(token: string, dogId) {
        return this.http
            .delete('https://mydogwalk-ad2f0.firebaseio.com/dogs/-' + dogId + '.json?auth=' + token)
            .map((response: Response) => {
                //console.log(response.json);
                return response.json();
            });
    }

}
