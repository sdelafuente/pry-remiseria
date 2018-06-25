import { Component, OnInit, Input, EventEmitter } from '@angular/core';
//  Servicios
import { ServicioService } from '../servicios/servicio.service';

export class Vehiculo {
  public id: any;
  public patente: any;
  public marca: any;
  public categoria: any;
  public ocupantes: any;

  constructor(patente, marca, categoria, ocupantes) {
      this.patente = patente;
      this.marca = marca;
      this.categoria = categoria;
      this.ocupantes = ocupantes;
   }
}

@Component({
  selector: 'app-abm-vehiculos',
  templateUrl: './abm-vehiculos.component.html',
  styleUrls: ['./abm-vehiculos.component.css']
})
export class AbmVehiculosComponent implements OnInit {

    //  Array de personas
    @Input() arrayVehiculos: Array<any>;
    @Input() error: Array<any>;
    @Input() btnCheck: boolean;

    private estaCargado: boolean;
    private mostrarLista: boolean;
    //   Objeto Vehiculo
    vehiculo: Vehiculo;
    public miVehiculo = new Vehiculo('', '', '', '');

    constructor(private service: ServicioService) {
        this.arrayVehiculos = new Array<any>();
    }

    ngOnInit() {
        this.buscarTodos();
        this.estaCargado = false;
        this.mostrarLista = false;
    }

    //  Traigo todas las personas
    buscarTodos() {

        this.service.getObjs('/vehiculo/')
        .then( data => { this.mostrarLista = true; this.arrayVehiculos = data; })
        .catch( error => { console.log(error); });
    }

    public esModificar(boleano) {
        this.estaCargado = boleano;

    }

    public cargar() {
        if (this.estaCargado) {
            this.modificarVehiculo();
        } else {
            this.cargarVehiculo();
        }
    }

    private cargarVehiculo() {

        const privVehiculo = new Vehiculo(
            this.miVehiculo.patente,
            this.miVehiculo.marca,
            this.miVehiculo.categoria,
            this.miVehiculo.ocupantes
        );

        this.service.postObj(privVehiculo, '/vehiculo/' )
        .subscribe(
           data => {
             this.buscarTodos();
             this.miVehiculo = new Vehiculo('', '', '', '');
             return true;
           },
           error => {
                console.log(error);
             console.error('Error guardando una vehiculo');
             return false;
           }
        );
    }

    private modificarVehiculo() {
        const privVehiculo = new Vehiculo(
            this.miVehiculo.patente,
            this.miVehiculo.marca,
            this.miVehiculo.categoria,
            this.miVehiculo.ocupantes
        );

        this.service.postObj(privVehiculo, '/vehiculo/modificar/')
        .subscribe(
           data => {
                this.buscarTodos();
                this.miVehiculo = new Vehiculo('', '', '', '');
                return true;
           },
           error => {
             console.error('Error modificando vehiculo');
             return false;
           }
        );

    }


    public cargarObjeto(vehiculo) {
        this.miVehiculo = new Vehiculo(vehiculo.patente, vehiculo.marca, vehiculo.categoria, vehiculo.ocupantes);
        return true;
    }

    public borrarVehiculo(vehiculo) {

        this.service.postObj(vehiculo, '/vehiculo/borrar/')
        .subscribe(
           data => {
                this.buscarTodos();
                return true;
           },
           error => {
             console.error('Error borrando vehiculo');

             return false;
           }
        );
    }
}
