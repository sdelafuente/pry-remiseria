import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../google-map.directive';
import {} from '@types/googlemaps';
import { ServicioService } from '../servicios/servicio.service';
import * as jwt_decode from 'jwt-decode';
import { Pago } from '../pago';

@Component({
  selector: 'app-remisero',
  templateUrl: './remisero.component.html',
  styleUrls: ['./remisero.component.css']
})
export class RemiseroComponent implements OnInit {
    private mostrarLista: boolean;
    private token: any;
    private tokenPayload: any;
    private mostrarLoader: boolean;
    private mostrarPagar: boolean;
    private pago = new Pago();
    private viaje: any;
    private mostrarCuentaCorriente: boolean;
    @Input() arrayViajes: Array<any>;

    constructor(private service: ServicioService) { }

    ngOnInit() {
        this.buscarTodos();
        this.mostrarLoader = false;
        this.mostrarPagar = false;
        this.pago.metodo = -1;
        this.mostrarCuentaCorriente = false;
    }

    //  Traigo todos mis viajes como remisero que esten activos
    buscarTodos() {

        this.token = localStorage.getItem('token');
        if (this.token !== null) {
            this.tokenPayload = jwt_decode(this.token);
            if (null !== this.tokenPayload.data.email) {
                this.mostrarLoader = true;
                this.service.getObjs('/viaje/remisero/' + this.tokenPayload.data.email)
                .then( data => {

                    if (data.viajes !== null) {
                        this.arrayViajes = data.viajes;
                        this.mostrarLoader = false;
                    }
                })
                .catch( error => {
                    console.log(error);
                    this.mostrarLoader = false;
                });
            }
        }
    }

    // Cancelo mi viaje como remisero
    cancelarViaje(viaje) {

        this.service.getObjs('/viaje/cancelar/' + viaje.id)
        .then( data => {
            if (data.cantidad > 0) {
                this.buscarTodos();
            }
        })
        .catch( error => {
            console.log(error);
        });

    }

    // Cancelo mi viaje como remisero
    cerrarViaje(viaje) {
        // console.log(viaje);
        this.viaje = viaje.fechayhora + ' ' + viaje.duracion + ' ' + viaje.distancia;
        this.mostrarPagar = true;
        this.pago.viaje_id = viaje.id;
        this.pago.metodo = viaje.tipo_pago;
        this.pago.token = this.token;
        this.pago.cuenta = '';
        // console.log(this.pago);
    }

    /*
        crear la clase pago para la API
        hacer que cuando se haga post se guarde el Pago
        una vez genero del pago, hacer update de viajes
    */


    pagarViaje() {


        this.service.postObj(this.pago, '/pago/' )
        .subscribe(
           data => {
             this.buscarTodos();
             this.mostrarPagar = false;
             return true;
           },
           error => {
                console.log(error);
                console.error('Error al pagar el viaje');
                return false;
           }
        );
        // this.service.postObjs('/viaje/cancelar/' + viaje.id)
        // .then( data => {
        //     if (data.cantidad > 0) {
        //         this.buscarTodos();
        //     }
        // })
        // .catch( error => {
        //     console.log(error);
        // });

    }


    verificarMetodo(valor) {

        if ('2' === valor) {
            this.mostrarCuentaCorriente = true;
        } else {
            this.mostrarCuentaCorriente = false;
        }

    }

}
