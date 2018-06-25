import { Component, OnInit, Input } from '@angular/core';
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
  @Input() captchaElem: any;

  user: User = new User('', '');
  // url: string = 'http://localhost:8080/servidor/jwt/';
  isCondition = false;
  ruta: string;
  tokenCaptcha: string;

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
      this.tokenCaptcha = localStorage.getItem('token_captcha');

      if (this.tokenCaptcha !== 'null' || true) {
          this.ws.postLogin( this.user, this.ruta )
          .then( data => {
              // console.log(data);
              /*
                hacer la logica para que si no existe el mail.
                Vaya a registrarase.
              */
              if ( data.token ) {
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('user', JSON.stringify(data.usuario));
                  this.router.navigateByUrl('/inicio');
                  this.router.navigateByUrl('/inicio');
                  // location.reload();
              }
          })
          .catch( e => {
            console.log(e);
          } );
      }

  }

  llegar() {
      alert(1);
  }

  admin() {
        this.function(1);
        this.user.email = 'admin@gmail.com';
        this.user.clave = '12345678a';
  }

  encargado() {
        this.function(1);
      this.user.email = 'encargado@gmail.com';
      this.user.clave = '12345678a';
  }

  remisero() {
        this.function(1);
      this.user.email = 'remisero@gmail.com';
      this.user.clave = '12345678a';
  }

  cancelar() {
      this.isCondition = false;
      this.user.email = '';
      this.user.clave = '';
  }


  private handleSuccess(recaptchaSuccess: any) {
      localStorage.setItem('token_captcha', recaptchaSuccess);
  }

  private handleExpire(recaptchaSuccess: any) {
      // localStorage.setItem('token_captcha', recaptchaSuccess);
  }

  private handleLoad() {
      localStorage.setItem('token_captcha', null);
  }
}
