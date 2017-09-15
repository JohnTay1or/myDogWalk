import firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    
    constructor(private http: Http) {}
                
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    
    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    
    logout() {
        firebase.auth().signOut();
    }
    
    getActiveUser() {
        return firebase.auth().currentUser;
    }
    
    defineUser(token: string, userType: string) {
        //this.dogs.push(dog);
        const userId = this.getActiveUser().uid;
        const userTypeObj = {userType: userType};
        console.log(userId);
        console.log(token);
        return this.http
            .put('https://mydogwalk-ad2f0.firebaseio.com/' + userId + '/user.json?auth=' + token, userTypeObj)
            .map((response: Response) => {
                return response.json(); 
            });
    }
}