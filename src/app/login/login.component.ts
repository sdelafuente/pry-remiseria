import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from '../servicios/servicio.service';
// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

export class User {
  public email = '';
  public clave = '';

  constructor( email: string, clave: string) {
    this.email = email;
    this.clave = clave;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  // public form:FormGroup;
  // public email:AbstractControl;
  // public password:AbstractControl;
  // public submitted:boolean = false;
  user: User = new User('', '');
  // url: string = 'http://localhost:8080/servidor/jwt/';
  isCondition = false;

  ruta: string;

  constructor( private router: Router, private ws: ServicioService) {
    this.user.email = '';
    // console.log(this.user);
  }

  ngOnInit() {
      this.isCondition = false;
  }

  function(bool) {
        this.isCondition = true;
      if (bool) {
        this.ruta = '/usuario/';
      } else {
        this.ruta = '/cliente/';
      }
  }

  enviar() {
    this.ws.postLogin( this.user, this.ruta )
    .then( data => {
        // console.log(data);
        if ( data.token ) {
            localStorage.setItem('token', data.token);
            this.router.navigateByUrl('/inicio');
        }
    })
    .catch( e => {
      console.log(e);
    } );
  }

  llegar() {
      alert(1);
  }

}
