import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../google-map.directive';
import {} from '@types/googlemaps';
import { ServicioService } from '../servicios/servicio.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-modificar-viaje',
  templateUrl: './modificar-viaje.component.html',
  styleUrls: ['./modificar-viaje.component.css']
})
export class ModificarViajeComponent implements OnInit {
    private mostrarLista: boolean;
    private token: any;
    private tokenPayload: any;

    @Input() arrayViajes: Array<any>;
    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

    constructor(private service: ServicioService) {
        // this.arrayViajes = new Array<any>();
    }

    ngOnInit() {
        this.buscarTodos();
    }

    //  Traigo todas las personas
    buscarTodos() {

        this.token = localStorage.getItem('token');
        if (this.token !== null) {
          this.tokenPayload = jwt_decode(this.token);
          if (null !== this.tokenPayload.data.email) {

              this.service.getObjs('/viaje/mios/' + this.tokenPayload.data.email)
              .then( data => {
                   // console.log(data);
                  if (data.viajes !== null) {
                      this.arrayViajes = data.viajes;
                  }

                })
              .catch( error => { console.log(error); });
          }
        }
    }

    modificarViaje(viaje) {
        console.log(viaje);
    }

    // Cancelo mi viaje
    cancelarViaje(viaje) {

        this.service.getObjs('/viaje/cancelar/' + viaje.id)
        .then( data => {
            if (data.cantidad > 0) {
                this.buscarTodos();
            }

          })
        .catch( error => { console.log(error); });
    }

}
