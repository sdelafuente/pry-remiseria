import { Component, OnInit, Input } from '@angular/core';
// import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
//  Servicios
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    //   Objeto Usuario
    usuario: Usuario;
    email: any;
    password: any;
    repassword: any;
    errorPassword: boolean;
    tokenCaptcha: string;
    @Input() captchaElem: any;

    constructor(private router: Router, private service: ServicioService) { }

    ngOnInit() {
        this.errorPassword = false;
        this.email = '';
        this.password = '';
        this.repassword = '';
    }

    limpiarPasswords() {
        this.errorPassword = false;
        this.password = '';
        this.repassword = '';
    }

    verificarPasswords() {
        if (this.password !== this.repassword) {
            this.errorPassword = true;
            return false;
        }
        return true;
    }

    private registrarUsuario() {
        // Capturo el Token del Captcha
        this.tokenCaptcha = localStorage.getItem('token_captcha');

        // Creo un usuario nuevo segun los datos proporcionados
        const privUsuario = new Usuario(
            0,
            this.email,
            this.email,
            'cliente',
            this.password
        );

        // Verifico que las contraseñas conicidan
        if (!this.verificarPasswords()) {
            return false;
        }

        // Existe el captcha
        if ( this.tokenCaptcha !== 'null' ) {
            this.service.postLogin( privUsuario, '/usuario/agregar/' )
            .then( data => {
                // console.log(data);
                this.router.navigateByUrl('/login');
                return true;
            })
            .catch( e => {
                // console.log(e);
                console.error('Error al cargar un usuario.');
                return false;
            } );
        }
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
