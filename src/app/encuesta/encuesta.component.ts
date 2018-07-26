import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Message } from 'primeng/primeng';

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
    public foto_1: any;
    public foto_2: any;
    public foto_3: any;

    constructor() { }
}

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

    @ViewChild('inputFile1') inputFile1;
    @ViewChild('inputFile2') inputFile2;
    @ViewChild('inputFile3') inputFile3;

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
    public mostrarFoto1: boolean;
    public mostrarFoto2: boolean;
    public mostrarFoto3: boolean;

    constructor( private router: Router, private ws: ServicioService ) {

    }

    ngOnInit() {
        this.miEncuesta = new Encuesta();
        this.encuestaCargada = false;
        this.respuesta_5 = -1;
        this.mostrarFoto1 = true;
        this.mostrarFoto2 = true;
        this.mostrarFoto3 = true;
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
        // console.log(this.miEncuesta);
        this.ws.postObj( this.miEncuesta, '/encuesta/' )
        .subscribe(
           data => {
                // console.log(data);
               // this.encuestaCargada = true;
               this.router.navigateByUrl('/inicio');
           },
           error => {
                console.log(error);
                console.error('Error guardando una encuesta.');
           }
        );
    }


    onSelect(event: any, referencia: any) {

        // console.log(event);
        // console.log(event.files);
        // console.log(referencia);
        let cant = 0;

        for (const file of event.files) {
            console.log(file);
             if (cant < 4 ) {
                 cant++;
                 console.log(event.files);
                // event.files.splice(event.files.indexOf(file), 1);
            }
        }
    }

    agregarFoto(indice: any, inputFoto: any) {
        let foto = this[inputFoto].nativeElement;
        let input = new FormData();

        if (foto.files && foto.files[0]) {
            let archivoPorSubir = foto.files[0];

            input.append('foto', archivoPorSubir);
            this.ws.postObj(input, '/archivo/')
            .subscribe(
               data => {

                    if (indice === 1) {
                        this.miEncuesta.foto_1 = data.nombre;
                        this.mostrarFoto1 = false;
                    } else if (indice === 2 ) {
                        this.miEncuesta.foto_2 = data.nombre;
                        this.mostrarFoto2 = false;
                    } else if (indice === 3) {
                        this.miEncuesta.foto_3 = data.nombre;
                        this.mostrarFoto3 = false;
                    }

               },
               error => {
                    console.log(error);
                    console.error('Error guardando un archivo.');
               }
            );
        }
        return true;
    }
}
