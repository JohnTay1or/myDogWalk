import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { Contact } from "../data/contact.interface"
//import { AuthService } from "./auth";

@Injectable()
export class ContactService {

    constructor(/*private authService: AuthService,*/
                private http: Http) {}

    addContact(token: string, contact: Contact) {
        //console.log('what about here');
        return this.http
            .post('https://mydogwalk-ad2f0.firebaseio.com/contacts.json?auth=' + token, contact)
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
