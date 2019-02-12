import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  showMenu: boolean = true;
  // rootNavCtrl: NavController;

  appMenuItems: Array<MenuItem>;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.appMenuItems = [
        {title: 'Home', component: 'page-home', icon: 'home'},
        {title: 'Messages', component: 'page-message-list', icon: 'mail'},
        {title: 'Local Weather', component: 'page-local-weather', icon: 'sunny'},
        {title: 'Rent a Car', component: 'page-search-cars', icon: 'car'},
        {title: 'Trip Activities', component: 'page-search-trips', icon: 'beer'},
        {title: 'Favorites', component: 'page-favorite-list', icon: 'heart'},
        {title: 'Booking List', component: 'page-booking-list', icon: 'briefcase'},
        {title: 'Support', component: 'page-support', icon: 'help-buoy'}
      ];
    });
  }

  
}

