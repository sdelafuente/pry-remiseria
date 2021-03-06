import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { Usuario } from '../usuario';

@Injectable()
export class ServicioService {

    url = 'http://localhost/api';
    // url = 'https://proyectocuatro.000webhostapp.com/api';
    // url = 'http://lodehumberto.epizy.com/api';

      constructor(public http: Http, private authHttp: AuthHttp) { }

      /**
       * Metodo HTTP nativo
       * @param user
       */
      get(user: Object) {
        return this.http.get(this.url, user)
        .toPromise()
        .then( this.extractData )
        .catch( this.handleError );
      }

      getObjs(ruta: string) {
        return this.http.get(this.url + ruta)
        .toPromise()
        .then( this.extractData )
        .catch( this.handleError );
      }

      postObj(objeto: Object, ruta: string) {
        return this.http.post(this.url  + ruta, objeto )
        .map((res: Response) => res.json());
      }

      postLogin(user: Object, ruta: string) {

        return this.http.post(this.url + ruta, user)
        .toPromise()
        .then( this.extractData )
        .catch( this.handleError );
      }

      postViaje(viaje: Object, ruta: string) {

        return this.http.post(this.url + ruta, {viaje})
        .toPromise()
        .then( this.extractData )
        .catch( this.handleError );

      }


      /**
       * Wrapper de HTTP que envia el token en la cabecera.
       * Para hacer peticines autenticado.
       * @param user
       */
      getJwt(url, user: Object) {
        return this.authHttp.get(url, user)
        .toPromise()
        .then( this.extractData )
        .catch( this.handleError );
      }

      public traerUsuarios() {
          return this.http.get( this.url  + '/usuario/')
          .toPromise()
          .then( this.extractData )
          .catch( this.handleError );
      }

      public CargarUsuario( url: string, usuario: Usuario ) {
          return this.http.post(this.url  + '/usuario' + url, usuario )
          .map((res: Response) => res.json());
      }


      public BorrarUsuario( url: string, usuario: Usuario ) {
          return this.http
          .post(this.url  + '/usuario' + url, usuario )
          .map((res: Response) => res.json());
      }

      public modificarUsuario( url: string, usuario: Usuario ) {
          return this.http
          .post( this.url + '/usuario' + url, usuario )
          .map((res: Response) => res.json());

      }

      public traerViajes() {
          return this.http.get( this.url  + '/viaje/')
          .toPromise()
          .then( this.extractData )
          .catch( this.handleError );
      }

      createArticle(article: any): Observable<any> {
           return this.http.post(this.url + '/usuario/', article).map((res: Response) => res.json());
      }

      private extractData(res: Response) {
        const body = res.json();

        return body || { };
      }

      private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        // console.error( errMsg );
        // console.error( 'CATCH' );
        return Observable.throw(errMsg);
      }

}
