import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

    token: any;
    tokenPayload: any;
    public tipoMenu: any;

    // decode the token to get its payload

  constructor(private router: Router) { }


  ngOnInit() {
      // this.verificarMenu();
  }

  verificarMenu() {
      this.token = localStorage.getItem('token');
      if (this.token !== null) {
          this.tokenPayload = jwt_decode(this.token);

          if ('admin' === this.tokenPayload.data.rol) {
              this.tipoMenu = 1;
          } else if ('encargado' === this.tokenPayload.data.rol)  {
              this.tipoMenu = 2;
          } else if ('remisero' === this.tokenPayload.data.rol) {
              this.tipoMenu = 3;
          } else if ('cliente' === this.tokenPayload.data.rol) {
              this.tipoMenu = 4;
          } else {
              this.tipoMenu = 0;
          }
          // console.log(this.tokenPayload.data.rol);
      } else {
          this.tipoMenu = 0;
      }
      return this.tipoMenu;
  }

  salir() {
    // localStorage.setItem('token', null);
    localStorage.clear();
    // window.alert('Chauuuuuu!!!');
    this.router.navigate(['/login']);
    this.verificarMenu();
  }

}
