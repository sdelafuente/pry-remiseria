import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ServicioService {

      url = 'http://localhost/api';
      // url = 'https://proyectocuatro.000webhostapp.com/api'

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

      postLogin(user: Object, ruta: string) {
        return this.http.post(this.url + ruta, user)
        .toPromise()
        .then( this.extractData )
        .catch( this.handleError );
      }

      postViaje(user: Object, ruta: string) {
        return this.http.post(this.url + ruta, user)
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
