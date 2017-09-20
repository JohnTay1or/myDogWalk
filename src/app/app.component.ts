import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { NavController, MenuController, AlertController } from "ionic-angular";
import { NavController, MenuController } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

//import { TabsPage } from '../pages/tabs/tabs';
import { TabsOwnerPage } from '../pages/tabsowner/tabsowner';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService} from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsOwnerPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: AuthService//,
              //private alertCtrl: AlertController
              ) {
    firebase.initializeApp({
      apiKey: "AIzaSyDfSnSi7aQbdNJrbbSZ-Q2Ijz2uDD0g8rQ",
      authDomain: "mydogwalk-ad2f0.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsOwnerPage;
        /*this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              //console.log(token);
              this.authService.getUserType(token)
                .subscribe(
                  (data) => {
                    console.log(data);
                    console.log(data.userType);
                    if (data.userType === 'owner') {
                      this.rootPage = TabsOwnerPage;
                    } else {
                      this.rootPage = TabsPage;
                    };
                  },
                  error => {
                    this.handleError(error.json().error);
                  }
                );
            }
          );*/
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }

  /*private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }*/
}
