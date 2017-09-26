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
}
