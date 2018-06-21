import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Usuario } from '../usuario';

//  Servicios
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.css']
})
export class AbmUsuariosComponent implements OnInit {

    //  Array de personas
    @Input() arrayUsuarios: Array<any>;
    @Input() error: Array<any>;
    @Input() btnCheck: boolean;

    private estaCargado: boolean;
    private mostrarLista: boolean;
    //   Objeto Usuario
    usuario: Usuario;
    public miUsuario = new Usuario(0, '', '', 'admin', '');

    constructor(private service: ServicioService) {
        this.arrayUsuarios = new Array<any>();
    }

    ngOnInit() {
        this.buscarTodos();
        this.estaCargado = false;
        this.mostrarLista = false;
    }

    //  Traigo todas las personas
    buscarTodos() {

        this.service.traerUsuarios()
        .then( data => { this.mostrarLista = true; this.arrayUsuarios = data; })
        .catch( error => { console.log(error); });
    }

    public esModificar(boleano) {
        this.estaCargado = boleano;

    }

    public cargar() {
        if (this.estaCargado) {
            this.modificarUsuario();
        } else {
            this.cargarUsuario();
        }
    }

    private cargarUsuario() {

        const privUsuario = new Usuario(
            this.miUsuario.id,
            this.miUsuario.username,
            this.miUsuario.email,
            this.miUsuario.rol,
            this.miUsuario.password
        );

        // privUsuario.rol = 'admin';

        this.service.CargarUsuario('/agregar/', privUsuario)
        .subscribe(
           data => {
             this.buscarTodos();
             this.miUsuario = new Usuario(0, '', '', '', '');
             return true;
           },
           error => {
                console.log(error);
             console.error('Error guardando una usuario');
             return false;
           }
        );
    }

    private modificarUsuario() {
        const privUsuario = new Usuario(
            this.miUsuario.id,
            this.miUsuario.username,
            this.miUsuario.email,
            this.miUsuario.rol,
            this.miUsuario.password
        );

        this.service.modificarUsuario('/modificar/', privUsuario)
        .subscribe(
           data => {
                this.buscarTodos();
                this.miUsuario = new Usuario(0, '', '', '', '');
                return true;
           },
           error => {
             console.error('Error modificando usuario');
             return false;
           }
        );

    }


    public cargarObjeto(usuario) {
        this.miUsuario = new Usuario(usuario.id, usuario.username, usuario.email, usuario.rol, usuario.password);
        return true;
    }

    public borrarUsuario(usuario) {
        // usuario.tipo = 'admin';
        this.service.BorrarUsuario('/borrar/', usuario)
        .subscribe(
           data => {
                this.buscarTodos();
                return true;
           },
           error => {
             console.error('Error borrando usuario');
             // console.error(error);
             return false;
           }
        );
    }
}
