import {Pipe, PipeTransform} from '@angular/core';
import {TipoClienteEnum} from '../enums/tipo-cliente.enum';

@Pipe({
  name: 'tipoCliente'
})
export class TipoClientePipe implements PipeTransform {

  transform(tipoCliente: string): string {
    let strTipoCliente = '';
    switch (tipoCliente) {
      case TipoClienteEnum.Natural:
        strTipoCliente = 'Natural'
        break;
      case TipoClienteEnum.Empresa:
        strTipoCliente = 'Empresa'
        break;
      case TipoClienteEnum.Pasaporte:
        strTipoCliente = 'Pasaporte'
        break;
      case TipoClienteEnum.Comisionista:
        strTipoCliente = 'Comisionista'
        break;
      default:
        strTipoCliente = 'No definido'
        break;
    }
    return strTipoCliente;
  }

}
