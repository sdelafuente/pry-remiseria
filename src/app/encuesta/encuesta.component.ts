import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { ServicioService } from '../servicios/servicio.service';

export class Encuesta {
    public token: any;
    public respuesta_1: any;
    public respuesta_2: any;
    public respuesta_3: any;
    public respuesta_4: any;
    public respuesta_5: any;
    public respuesta_6: any;
    public respuesta_7: any;
    public respuesta_8: any;

    constructor() { }
}

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

    private miEncuesta: Encuesta;
    public respuesta_1: any;
    public respuesta_2: any;
    public respuesta_3: any;
    public respuesta_4: any;
    public respuesta_5: any;
    public respuesta_6: any;
    public respuesta_7: any;
    public respuesta_8: any;
    private encuestaCargada: boolean;

    constructor( private router: Router, private ws: ServicioService ) {

    }

    ngOnInit() {
        this.miEncuesta = new Encuesta();
        this.encuestaCargada = false;
    }

    cargarEncuesta() {

        this.miEncuesta.respuesta_1 = this.respuesta_1;
        this.miEncuesta.respuesta_2 = this.respuesta_2;
        this.miEncuesta.respuesta_3 = this.respuesta_3;
        this.miEncuesta.respuesta_4 = this.respuesta_4;
        this.miEncuesta.respuesta_5 = this.respuesta_5;
        this.miEncuesta.respuesta_6 = this.respuesta_6;
        this.miEncuesta.respuesta_7 = this.respuesta_7;
        this.miEncuesta.respuesta_8 = this.respuesta_8;
        this.miEncuesta.token = localStorage.getItem('token');

        this.ws.postObj( this.miEncuesta, '/encuesta/' )
        .subscribe(
           data => {
               this.encuestaCargada = true;
               this.router.navigateByUrl('/inicio');
           },
           error => {
                console.log(error);
                console.error('Error guardando una encuesta.');
           }
        );
    }
}
