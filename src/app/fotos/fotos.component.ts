import { Component, OnInit, Input, EventEmitter } from '@angular/core';


//  Servicios
import { ServicioService } from '../servicios/servicio.service';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

        //  Array de personas
        @Input() arrayEncuestas: Array<any>;

        @Input() error: Array<any>;


        private mostrarLista: boolean;

        constructor(private service: ServicioService) {
            this.arrayEncuestas = new Array<any>();
        }

        ngOnInit() {
            this.buscarTodos();
            this.mostrarLista = false;

        }

        //  Traigo todas las personas
        buscarTodos() {

            this.service.getObjs('/encuesta/')
            .then( data => {
                this.mostrarLista = true;
                this.arrayEncuestas = data;

            })
            .catch( error => { console.log(error); });
        }
}
