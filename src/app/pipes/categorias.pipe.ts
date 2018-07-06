import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorias'
})
export class CategoriasPipe implements PipeTransform {
    respuesta: any;

  transform(value: any): any {
    if (value === '0') {
      this.respuesta = 'Standard';
    }
    if (value === '1') {
        this.respuesta = 'Confort';
    }
    if (value === '2') {
        this.respuesta = 'Premium';
    }
    return this.respuesta;
  }

}
