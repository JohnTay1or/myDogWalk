import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { TabsOwnerPage } from '../pages/tabsowner/tabsowner';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import { DogsPage } from '../pages/dogs/dogs';
import { DogPage } from '../pages/dog/dog';
import { DogsService } from '../services/dogs';
import { NewDogPage } from '../pages/new-dog/new-dog';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    FavoritesPage,
//    HomePage,
    TabsPage,
    TabsOwnerPage,
    DogsPage,
    DogPage,
    NewDogPage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    FavoritesPage,
//    HomePage,
    TabsPage,
    TabsOwnerPage,
    DogsPage,
    DogPage,
    NewDogPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DogsService,
    AuthService
  ]
})
export class AppModule {}
