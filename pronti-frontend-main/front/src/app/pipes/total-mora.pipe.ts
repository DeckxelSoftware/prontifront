import {Pipe, PipeTransform} from '@angular/core';
import {TipoMovimientoEnum} from '../enums/tipo-movimiento.enum';
import {ContratoResponseDto} from '../modulos/contrato/servicios/dto/contrato.response-dto';

@Pipe({
  name: 'totalMora'
})
export class TotalMoraPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto): number {
    let resultado = 0;

    if (contrato.historicoPlanContratoCollection) {
      if (contrato.historicoPlanContratoCollection.length > 0) {
        // @ts-ignore
        const historico = contrato.historicoPlanContratoCollection.at(-1);
        if (historico.totalCuotasMoraActual > 0) {
          if (historico.cuotaCollection.length > 0) {
            resultado = historico.cuotaCollection[0].valorCuota * historico.totalCuotasMoraActual;
            return resultado;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }


  }

}
