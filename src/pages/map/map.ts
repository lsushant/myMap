import { Component, ElementRef, ViewChild } from '@angular/core';

import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { IonicPage,NavController, Platform } from 'ionic-angular';
@IonicPage( {
  name: 'page-map',
  segment: 'map'
  
} )

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform) {

  }

  ionViewDidLoad(){

    this.platform.ready().then(() => {

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);

    });

  }

}
