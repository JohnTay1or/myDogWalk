import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

//import { Profile } from "../data/profile.interface";
import { AuthService } from "./auth";
import { Profile } from "../data/profile.interface";

@Injectable()
export class ProfileService {

    public profile: Profile;

    constructor(private authService: AuthService,
                private http: Http) {}

    getProfile(token: string) {
      const activeUser = this.authService.getActiveUser();
      const userId = activeUser.uid;
      const email = activeUser.email;

      return this.http
        .get('https://mydogwalk-ad2f0.firebaseio.com/users/' + userId + '.json?auth=' + token)
        .map((response: Response) => {
          var data = response.json();
          data.userId = userId;
          data.email = email;
          //return response.json();
          this.profile = data;
          return data;
        });
    }

    isOwner() {
      return this.profile.userType === 'owner';
    }

    isWalker() {
      return this.profile.userType === 'walker';
    }
}
