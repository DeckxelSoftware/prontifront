import {Pipe, PipeTransform} from '@angular/core';
import {TipoTransaccionEnum} from "../enums/tipo-transaccion.enum";
import {MesEnum} from "../enums/mes.enum";

@Pipe({
  name: 'mes'
})
export class MesPipe implements PipeTransform {

  transform(mes: string): unknown {
    let salida = '';
    switch (mes) {
      case MesEnum.Enero:
        salida = 'Enero';
        break;
      case MesEnum.Febrero:
        salida = 'Febrero';
        break;
      case MesEnum.Marzo:
        salida = 'Marzo';
        break;
      case MesEnum.Abril:
        salida = 'Abril';
        break;

      case MesEnum.Mayo:
        salida = 'Mayo';
        break;


      case MesEnum.Junio:
        salida = 'Junio';
        break;


      case MesEnum.Julio:
        salida = 'Julio';
        break;


      case MesEnum.Agosto:
        salida = 'Agosto';
        break;

      case MesEnum.Septiembre:
        salida = 'Septiembre';
        break;

      case MesEnum.Octubre:
        salida = 'Octubre';
        break;

      case MesEnum.Noviembre:
        salida = 'Noviembre';
        break;

      case MesEnum.Diciembre:
        salida = 'Diciembre';
        break;
      default:
        salida = 'No tiene'

    }
    return salida;
  }

}
