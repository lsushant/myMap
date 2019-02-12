import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import {HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';

import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { Connectivity } from '../providers/connectivity/connectivity';

import { GoogleMaps } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { RestApiServiceProvider } from '../providers/rest-api-service/rest-api-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    HttpClient,
    HttpModule ,
    Geolocation,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Connectivity,
    GoogleMaps,
    LocationsProvider,
    RestApiServiceProvider
  ]
})
export class AppModule {}
