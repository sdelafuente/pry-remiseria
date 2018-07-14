import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from '../servicios/servicio.service';

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

    @Input() captchaElem: any;

    user: User = new User('', '');
    isCondition = false;
    ruta: string;
    tokenCaptcha: string;

    constructor( private router: Router, private ws: ServicioService) {
      this.user.email = '';
    }

    ngOnInit() {
        this.isCondition = false;
    }

    function(bool) {
        this.isCondition = true;
        if (bool) {
            this.ruta = '/usuario/';
        } else {
            this.ruta = '/usuario/';
        }
    }

    enviar() {

          // this.ws.createArticle(this.user )
          // .subscribe(
          //    data => {
          //        if ( data.token ) {
          //            localStorage.setItem('token', data.token);
          //            localStorage.setItem('user', JSON.stringify(data.usuario));
          //            this.router.navigateByUrl('/inicio');
          //            // location.reload();
          //        }
          //       return true;
          //    },
          //    error => {
          //      console.error('Error al tratar de hacer login.');
          //      return false;
          //    }
          // );

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
              }
          })
          .catch( e => {
            console.log(e);
          } );

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

    cliente() {
        this.function(0);
        this.user.email = 'santiago.daniel.delafuente@hotmail.com';
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
