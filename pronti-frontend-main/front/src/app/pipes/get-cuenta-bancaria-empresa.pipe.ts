import { Pipe, PipeTransform } from '@angular/core';
import { Pagos2ResponseDto } from '../modulos/pagos2/servicios/dto/pagos2.response-dto';

@Pipe({
  name: 'getCuentaBancariaEmpresa'
})
export class GetCuentaBancariaEmpresaPipe implements PipeTransform {

  transform(registro: any, parametro: string): any {

    if (!registro.idTrabajador?.informacionFinancieraCollection) {
      return 'No registra';

    }
    if (registro.idTrabajador?.informacionFinancieraCollection?.length <= 0) {

      return 'No registra';
    }

    if (registro.idTrabajador.informacionFinancieraCollection[0].cuentaBancariaEmpresaCollection) {

      if (parametro === 'nombre') {
        return registro.idTrabajador.informacionFinancieraCollection[0].cuentaBancariaEmpresaCollection[0].idBanco.nombre;
      }

      return registro.idTrabajador.informacionFinancieraCollection[0].cuentaBancariaEmpresaCollection[0][`${parametro}`];
    }
    else {
      return 'No registra';
    }

  }

}
