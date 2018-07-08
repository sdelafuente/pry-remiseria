import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../google-map.directive';
import {} from '@types/googlemaps';
import { Router } from '@angular/router';
import { ServicioService } from '../servicios/servicio.service';
import { CategoriasPipe } from '../pipes/categorias.pipe';

declare var google: any;
declare var jQuery: any;

export class Viaje {
    public lat_o: any;
    public lng_o: any;
    public lat_d: any;
    public lng_d: any;
    public fechayhora: any;
    public tipo_pago: any;
    public duracion: any;
    public distancia: any;
    public token: any;
    public nivel: any;
    public vehiculo_id: any;

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
    private nivel: any;
    private vehiculo_id: any;
    private objViaje: Viaje;
    public viajeSolicitado: boolean;
    public origin: any ; // its a example aleatory position
    public destination: any; // its a example aleatory position
    public captchaView: any;
    public captchaRespuesta: any;
    public captchaError: boolean;

    // abcdefghijqlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789

    @ViewChild('pickupInput') pickupInputElementRef: ElementRef;

    @ViewChild('pickupOutput') pickupOutputElementRef: ElementRef;

    @ViewChild('scrollMe')
    private scrollContainer: ElementRef;

    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

    @Input() arrayAutos: Array<any>;

    constructor(
        private router: Router,
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
        this.vehiculo_id = -1;
        this.metodoPago = -1;
        this.arrayAutos = new Array<any>();
        this.cargarAutos();
        this.cargarCaptcha();

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


    // Traigo los autos habilitados
    cargarAutos() {

        this.ws.getObjs('/vehiculo/habilitados/')
        .then( data => {
            this.arrayAutos = data;
        })
        .catch( error => {
            console.log(error);
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

             if (this.vc.destination !== undefined ) {
                this.origenLat = this.vc.origin.latitude;
                this.origenLng = this.vc.origin.longitude;
                this.destinoLat = this.vc.destination.latitude;
                this.destinoLng = this.vc.destination.longitude;
                this.getDistanceAndDuration();
             }

             // this.estimatedTime = localStorage.getItem('duracion');
             // this.estimatedTime = '1000 km';
           });

        });

   }

    getDistanceAndDuration() {
        this.estimatedTime = localStorage.getItem('duracion');
        this.estimatedDistance = localStorage.getItem('distancia');
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

   //  getRandomInt(min, max) {
   //      return Math.floor(Math.random() * (max - min + 1)) + min;
   //  }
   //
   // this.generate = function() {
   //     this.number = this.getRandomInt(1, 100);
   // };

    // this.generate();

    cargarCaptcha() {
        const CADENA = 'abcdefghijqlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let numero: any;
        let stringCaptcha: any;

        this.captchaError = false;
        this.captchaRespuesta = '';

        stringCaptcha = '';
        for (let i = 0; i < 6; i++) {
            numero = Math.floor(Math.random() * (CADENA.length - 1));
            stringCaptcha += CADENA[numero];
        }
        this.captchaView = stringCaptcha;
    }

    validarCaptcha() {
        if (this.captchaView !== this.captchaRespuesta) {
            return false;
        }
        return true;
    }

    pedirViaje() {

        const dateString = this.fechaViaje;
        const newDate = new Date(dateString);

        if (true === this.captchaError) {
            return false;
        }

        if (!this.validarCaptcha()) {
            this.captchaError = true;
            return false;
        }

        this.objViaje.lat_o = this.origenLat;
        this.objViaje.lng_o = this.origenLng;
        this.objViaje.lat_d = this.destinoLat;
        this.objViaje.lng_d = this.destinoLng;
        this.objViaje.tipo_pago = this.metodoPago;
        this.objViaje.fechayhora =  this.fechaViaje; // newDate;
        this.objViaje.duracion = this.estimatedTime;
        this.objViaje.distancia = this.estimatedDistance;
        this.objViaje.nivel = this.nivel;
        this.objViaje.vehiculo_id = this.vehiculo_id;
        this.objViaje.token = localStorage.getItem('token');

        this.ws.postViaje( this.objViaje, '/viaje/' )
        .then( data => {
            this.viajeSolicitado = true;
            this.router.navigateByUrl('/encuesta');
           /*
             hacer la logica para que si no existe el mail.
             Vaya a registrarase.
           */
       })
       .catch( e => {
           console.log(e);
       } );
   }
}
