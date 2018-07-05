import { Component, OnInit, Input, EventEmitter } from '@angular/core';
//  Servicios
import { ServicioService } from '../servicios/servicio.service';

export class Vehiculo {
  public id: any;
  public usuario_id: any;
  public patente: any;
  public marca: any;
  public categoria: any;
  public ocupantes: any;
  public habilitado: any;

  constructor(patente, marca, categoria, ocupantes, usuario_id) {
      this.patente = patente;
      this.marca = marca;
      this.categoria = categoria;
      this.ocupantes = ocupantes;
      this.usuario_id = usuario_id;
      this.habilitado = 0;
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
    @Input() arrayRemos: Array<any>;
    @Input() error: Array<any>;
    @Input() btnCheck: boolean;

    private estaCargado: boolean;
    private mostrarLista: boolean;
    //   Objeto Vehiculo
    vehiculo: Vehiculo;
    public miVehiculo = new Vehiculo('', '', '', '', -1);

    constructor(private service: ServicioService) {
        this.arrayVehiculos = new Array<any>();
        this.arrayRemos = new Array<any>();
    }

    ngOnInit() {
        this.buscarTodos();
        this.cargarRemos();
        this.estaCargado = false;
        this.mostrarLista = false;
        this.miVehiculo.usuario_id = -1;
    }

    //  Traigo todas las personas
    buscarTodos() {

        this.service.getObjs('/vehiculo/')
        .then( data => { this.mostrarLista = true; this.arrayVehiculos = data; })
        .catch( error => { console.log(error); });
    }

    cargarRemos() {

        this.service.getObjs('/usuario/remo/')
        .then( data => {
            this.arrayRemos = data;
        })
        .catch( error => { console.log(error); });
    }

    public esModificar(boleano) {
        this.estaCargado = boleano;

    }

    public habilitar(boleano) {
        if (boleano) {
            this.miVehiculo.habilitado = 1;
        } else {
            this.miVehiculo.habilitado = 0;
        }
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
            this.miVehiculo.ocupantes,
            this.miVehiculo.usuario_id
        );

        this.service.postObj(privVehiculo, '/vehiculo/' )
        .subscribe(
           data => {
             this.buscarTodos();
             this.miVehiculo = new Vehiculo('', '', '', '', -1);
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
            this.miVehiculo.ocupantes,
            this.miVehiculo.usuario_id
        );

        if (this.miVehiculo.habilitado !== 0) {
            privVehiculo.habilitado = 1;
        }

        // console.log(privVehiculo);

        this.service.postObj(privVehiculo, '/vehiculo/modificar/')
        .subscribe(
           data => {
                this.buscarTodos();
                this.miVehiculo = new Vehiculo('', '', '', '', -1);
                return true;
           },
           error => {
             console.error('Error modificando vehiculo');
             return false;
           }
        );

    }


    public cargarObjeto(vehiculo) {
        this.miVehiculo = new Vehiculo(vehiculo.patente, vehiculo.marca, vehiculo.categoria, vehiculo.ocupantes, vehiculo.usuario_id);
        if (vehiculo.habilitado === 1) {
            this.miVehiculo.habilitado =  1;
        }
        // #javascriptcb.checked = true;
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
