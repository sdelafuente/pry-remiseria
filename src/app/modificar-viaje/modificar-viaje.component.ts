import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../google-map.directive';
import {} from '@types/googlemaps';
import { ServicioService } from '../servicios/servicio.service';


@Component({
  selector: 'app-modificar-viaje',
  templateUrl: './modificar-viaje.component.html',
  styleUrls: ['./modificar-viaje.component.css']
})
export class ModificarViajeComponent implements OnInit {
    private mostrarLista: boolean;

    @Input() arrayViajes: Array<any>;
    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

    constructor(private service: ServicioService) {
        this.arrayViajes = new Array<any>();
    }

    ngOnInit() {
      this.buscarTodos();
      this.mostrarLista = true;
    }

  //  Traigo todas las personas
  buscarTodos() {

      this.service.traerViajes()
      .then( data => { this.mostrarLista = true; this.arrayViajes = data; })
      .catch( error => { console.log(error); });
  }

}
