import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { Dog } from "../data/dog.interface";
import { AuthService } from "./auth";

@Injectable()
export class DogsService {
    public favoriteDogs: Dog[] = [];
    //private dogs: Dog[] = [];

    constructor(private authService: AuthService,
                private http: Http) {}

    addDogToFavorites(token: string, dog: Dog) {
        //console.log('Add before');
        //console.log(this.favoriteDogs);
        this.favoriteDogs.push(dog);
        //console.log('Add after');
        //console.log(this.favoriteDogs);
        const userId = this.authService.getActiveUser().uid;
        return this.http
            .post('https://mydogwalk-ad2f0.firebaseio.com/users/' + userId + '/favorites.json?auth=' + token, {dogId: dog.id})
            .map((response: Response) => {
                return response.json();
            });
    }

    getFavoriteDogs(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http
            .get('https://mydogwalk-ad2f0.firebaseio.com/users/' + userId + '/favorites.json?auth=' + token)
            .map((response: Response) => {
                return response.json();
            });
    }

    getFavoriteDogsLocal() {
      return this.favoriteDogs.slice();
    }

    removeDogFromFavorites(token: string, dogId: string) {
      //console.log('remove before');
      //console.log(this.favoriteDogs);
      const position = this.favoriteDogs.findIndex((dogEl: Dog) => {
        return dogEl.id == dogId;
      });
      this.favoriteDogs.splice(position, 1);
      //console.log('remove after');
      //console.log(this.favoriteDogs);
        const userId = this.authService.getActiveUser().uid;
        return this.http
            .delete('https://mydogwalk-ad2f0.firebaseio.com/users/' + userId + '/favorites/' + dogId + '.json?auth=' + token)
            .map((response: Response) => {
                return response.json();
            });
    }

    //getFavoriteDogs() {
    //    return this.favoriteDogs.slice();
    //}

    isDogFavorite(dog: Dog) {
      //console.log('watching this now');
      //console.log(this.favoriteDogs);
      return this.favoriteDogs.find((dogEl: Dog) => {
        //console.log('In is favorite');
        //console.log(dogEl.id);
        //console.log(dog.id)
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

    getDog(token: string, dogId: string) {
        return this.http
            .get('https://mydogwalk-ad2f0.firebaseio.com/dogs/' + dogId + '.json?auth=' + token)
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
