import { Injectable } from '@angular/core';
import { Connectivity } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';
import { RestApiServiceProvider } from '../rest-api-service/rest-api-service';
declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string='AIzaSyDI82P1WieOuHk_ubl2hBbcNCPC4kkaw2E';
  errorMessage: string;
  places =[];
 

  constructor(public connectivity: Connectivity,public geolocation: Geolocation,public restapi: RestApiServiceProvider) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
   // this.addNearbyplaces();
    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivity.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }

          document.body.appendChild(script);  

        } 
      }
      else {

        if(this.connectivity.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
 
      this.geolocation.getCurrentPosition().then((position) => {

        

        // UNCOMMENT FOR NORMAL USE
        //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        var latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        

      //   var marker = new google.maps.Marker({
      //     map: this.map,
      //     position: latLng ,
      //   title: "kiran"
      // });

      var JsonPayload={
        "latitude":position.coords.latitude,
        "longitude":position.coords.longitude,
        "radius":3000
      }
      this.addNearbyplaces(JsonPayload);
        
        resolve(true);

      });

    });

  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  addMarker(lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);  

  }
// Add nearby places  
  addNearbyplaces(JsonPayload:any ){
    this.restapi.getNearByScreen (JsonPayload)
            .subscribe(
              places => {
                this.places = places;
              
                for(var i=0;i<this.places.length;i++) {
                                   
                  this.addMarker(this.places[i].lattitude,this.places[i].longitude);
                }
               
                  }
              
            
            )
  }

}
