import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../google-map.directive';
import {} from '@types/googlemaps';
import { ServicioService } from '../servicios/servicio.service';


declare var google: any;
declare var jQuery: any;

export class Viaje {
  public lat_o: any;
  public lng_o: any;
  public lat_d: any;
  public lng_d: any;
  public fechayhora: any;
  public tipo_pago: any;
  public token: any;

  constructor() { }
}

@Component({
  selector: 'app-abm-viajes',
  templateUrl: './abm-viajes.component.html',
  styleUrls: ['./abm-viajes.component.css'],
  providers : [ GoogleMapsAPIWrapper ]
})
export class AbmViajesComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public destinationInput: FormControl;
    public destinationOutput: FormControl;
    public zoom: number;
    public iconurl: string;
    public mapCustomStyles: any;
    public estimatedTime: any;
    public estimatedDistance: any;
    public startDate: any;
    public fechaViaje: any;
    public metodoPago: any;
    private origenLat: any;
    private origenLng: any;
    private destinoLat: any;
    private destinoLng: any;
    private objViaje: Viaje;
    public viajeSolicitado: boolean;

       @ViewChild('pickupInput') pickupInputElementRef: ElementRef;

       @ViewChild('pickupOutput') pickupOutputElementRef: ElementRef;

       @ViewChild('scrollMe')
       private scrollContainer: ElementRef;

       @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

       public origin: any ; // its a example aleatory position
       public destination: any; // its a example aleatory position
       constructor(
         private mapsAPILoader: MapsAPILoader,
         private ngZone: NgZone,
         private gmapsApi: GoogleMapsAPIWrapper,
         private _elementRef: ElementRef,
         private ws: ServicioService
       ) {
           const date = new Date();
           const year = date.getFullYear();
           const month = date.getMonth();
           const day = date.getDay();

           this.startDate = new Date(year, month, day);
       }

       ngOnInit() {
           this.objViaje = new Viaje();
           this.viajeSolicitado = false;
         // set google maps defaults
         this.zoom = 4;
         this.latitude = -34.603722;
         this.longitude = -58.381592;

         this.iconurl = '../image/map-icon.png';

        // this.mapCustomStyles = this.getMapCusotmStyles();
         // create search FormControl
         this.destinationInput = new FormControl();
         this.destinationOutput = new FormControl();

         // set current position
         // this.setCurrentPosition();

         // load Places Autocomplete
         this.mapsAPILoader.load().then(() => {
             const autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
                     types: ['address']
            });

             const autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
                        types: ['address']
            });

            this.setupPlaceChangedListener(autocompleteInput, 'ORG');
            this.setupPlaceChangedListener(autocompleteOutput, 'DES');
         });
       }

       private setupPlaceChangedListener(autocomplete: any, mode: any ) {
         autocomplete.addListener('place_changed', () => {
               this.ngZone.run(() => {
                 // get the place result
                 const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                 // verify result
                 if (place.geometry === undefined) {
                   return;
                 }
                 if (mode === 'ORG') {
                     this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
                     this.vc.originPlaceId = place.place_id;
                 } else {
                     this.vc.destination = {
                         longitude: place.geometry.location.lng(),
                         latitude: place.geometry.location.lat()
                     }; // its a example aleatory position
                     this.vc.destinationPlaceId = place.place_id;
                 }

                 if (this.vc.directionsDisplay === undefined) {
                        this.mapsAPILoader.load().then(() => {
                         this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                     });
               }

                 // Update the directions
                 this.vc.updateDirections();
                 this.zoom = 12;
                 // this.getDistanceAndDuration();

                 if (this.vc.destination !== undefined ) {
                    this.origenLat = this.vc.origin.latitude;
                    this.origenLng = this.vc.origin.longitude;
                    this.destinoLat = this.vc.destination.latitude;
                    this.destinoLng = this.vc.destination.longitude;
                 }

                 // this.estimatedTime = localStorage.getItem('duracion');
                 // this.estimatedTime = '1000 km';
               });

            });

       }

       getDistanceAndDuration() {
         this.estimatedTime = this.vc.estimatedTime;
         this.estimatedDistance = this.vc.estimatedDistance;
       }

       scrollToBottom(): void {
         jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
       }
       private setPickUpLocation( place: any ) {
         // verify result
               if (place.geometry === undefined || place.geometry === null) {
                 return;
               }
               // set latitude, longitude and zoom
               this.latitude = place.geometry.location.lat();
               this.longitude = place.geometry.location.lng();
               this.zoom = 12;
       }

       private setCurrentPosition() {
         if ('geolocation' in navigator) {
           navigator.geolocation.getCurrentPosition((position) => {
             this.latitude = position.coords.latitude;
             this.longitude = position.coords.longitude;
             this.zoom = 12;
           });
         }
       }

       private getMapCusotmStyles() {
         // Write your Google Map Custom Style Code Here.
       }

       private validarCampos() {

       }
       pedirViaje() {
                const dateString = this.fechaViaje;
                const newDate = new Date(dateString);

           this.validarCampos();
           this.objViaje.lat_o = this.origenLat;
           this.objViaje.lng_o = this.origenLng;
           this.objViaje.lat_d = this.destinoLat;
           this.objViaje.lng_d = this.destinoLng;
           this.objViaje.tipo_pago = this.metodoPago;
           this.objViaje.fechayhora = newDate;
           this.objViaje.token = localStorage.getItem('token');

            // console.log(this.objViaje);

           this.ws.postViaje( this.objViaje, '/viaje/' )
           .then( data => {
               this.viajeSolicitado = true;
                // console.log(data);
               /*
                 hacer la logica para que si no existe el mail.
                 Vaya a registrarase.
               */
               // if ( data.token ) {
               //      localStorage.setItem('token', data.token);
               //      this.router.navigateByUrl('/bienvenida');
               // }
           })
           .catch( e => {
               console.log(e);
           } );
           console.log(this.objViaje);

       }

       verFecha() {
           console.log(this.fechaViaje);
       }
}
