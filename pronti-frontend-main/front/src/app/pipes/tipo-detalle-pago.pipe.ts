import {Pipe, PipeTransform} from "@angular/core";
import {TipoDetallePagoEnum} from "../enums/tipo-detalle-pago.enum";

@Pipe({
  name: 'tipoDetallePago'
})
export class TipoDetallePagoPipe implements PipeTransform {

  transform(tipoDetallePago: string): string {
    let strTipoMovimiento = '';
    switch (tipoDetallePago) {
      case TipoDetallePagoEnum.inscripcion:
        strTipoMovimiento = 'Inscripción'
        break;
      case TipoDetallePagoEnum.abonoCapital:
        strTipoMovimiento = 'Capital suscriptor'
        break;
      case TipoDetallePagoEnum.cuotaAdministrativa:
        strTipoMovimiento = 'Cuota administrativa'
        break;
      case TipoDetallePagoEnum.dispositivo:
        strTipoMovimiento = 'Dispositivo'
        break;
      case TipoDetallePagoEnum.rastreo:
        strTipoMovimiento = 'Rastreo'
        break;
      default:
        strTipoMovimiento = 'No definido';
        break;
    }
    return strTipoMovimiento;
  }

}
