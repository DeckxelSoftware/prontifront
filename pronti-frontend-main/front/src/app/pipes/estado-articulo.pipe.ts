import { Pipe, PipeTransform } from '@angular/core';
import {EstadoArticuloEnum} from '../enums/estado-articulo.enum';

@Pipe({
  name: 'estadoArticulo'
})
export class EstadoArticuloPipe implements PipeTransform {

  transform(value: string): string{
    let salida = '';
    if (value === EstadoArticuloEnum.Flota){
      salida = 'Flota';
    } else if (value === EstadoArticuloEnum.Comprado){
      salida = 'Comprado';
    } else if(value === EstadoArticuloEnum.Entregado){
      salida = 'Entregado'
    }else {
      salida = 'No tiene';
    }
    return salida;
  }

}
