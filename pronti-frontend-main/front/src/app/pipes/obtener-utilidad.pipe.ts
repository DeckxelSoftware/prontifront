import { Pipe, PipeTransform } from '@angular/core';
import { Pagos2ResponseDto } from '../modulos/pagos2/servicios/dto/pagos2.response-dto';

@Pipe({
  name: 'obtenerUtilidad'
})
export class ObtenerUtilidadPipe implements PipeTransform {

  transform(registro: Pagos2ResponseDto): number {

    if (!registro.idPeriodoLaboral?.rolPagoCollection) {
      return 0;
    }


    // @ts-ignore
    if (!registro.idPeriodoLaboral?.rolPagoCollection.at(-1).idHistoricoRol) {
      return 0;
    }


    // @ts-ignore
    if (!registro.idPeriodoLaboral?.rolPagoCollection.at(-1).idHistoricoRol.utilidad) {
      return 0;
    }

    // @ts-ignore
    return registro.idPeriodoLaboral.rolPagoCollection.at(-1).idHistoricoRol.utilidad;
  }

}
